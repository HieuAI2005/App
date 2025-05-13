import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    FlatList,
    Dimensions,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const { width: screenWidth } = Dimensions.get('window');
const initialCartItemsData = [
    {
        id: '1',
        brand: "Lauren's",
        name: 'Orange Juice',
        price: 149,
        quantity: 2,
        imageSource: require('../assets/example.png'),
    },
    {
        id: '2',
        brand: "Baskin's",
        name: 'Skimmed Milk',
        price: 129,
        quantity: 2,
        thumbnail: require('../assets/card3.jpg'), 
    },
    {
        id: '3',
        brand: "Marley's",
        name: 'Aloe Vera Lotion',
        price: 1249,
        quantity: 2,
        thumbnail: require('../assets/card2.jpg'), 
    },
];

const tabItems = [
    { 
        id: 'home', 
        icon: 'home-outline', 
    },
    { 
        id: 'notifications', 
        icon: 'bell-outline', 
    },
    { 
        id: 'orders', 
        icon: 'script-text-outline', 
    }, 
    { 
        id: 'history', 
        icon: 'history', 
    },
    { 
        id: 'cart', 
        icon: 'cart-outline', 
    }, 
];

const Cart = ({ navigation }) => { 
    const [cartItems, setCartItems] = useState(initialCartItemsData);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [cartItems]);

    const handleQuantityChange = (itemId, change) => {
        setCartItems(prevItems =>
        prevItems.map(item =>
            item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + change) } 
            : item
        ).filter(item => item.quantity > 0)
        );
    };

    const handleProceedToCheckout = () => {
        console.log('Proceeding to checkout with items:', cartItems);
        Alert.alert("Checkout", `Total: ${totalPrice.toLocaleString()}`);
    };

    const CartItem = ({ item }) => (
        <View style={styles.cartItemContainer}>
        <Image source={item.imageSource} style={styles.itemImage} />
        <View style={styles.itemDetails}>
            <Text style={styles.itemBrand}>{item.brand}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>$ {item.price.toLocaleString()}</Text>
        </View>
        <View style={styles.quantityControl}>
            <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)} style={styles.quantityButton}>
            <Icon name="remove" size={18} color="#F5A623" />
            </TouchableOpacity>
            <Text style={styles.itemQuantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)} style={styles.quantityButton}>
            <Icon name="add" size={18} color="#F5A623" />
            </TouchableOpacity>
        </View>
        </View>
    );

    const BottomTabBar = () => (
        <View style={styles.tabBarContainer}>
            <View style={styles.tabBar}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={styles.tabItem}
                >
                    <Icon name="home" size={26}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Icon name="notifications-outline" size={26} color="#8e8e93" />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('ScanScreen')}
                    style={styles.tabItem}
                >
                    <Icon name="scan-outline" size={26} color="#8e8e93" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tabItem}>
                    <Icon name="time-outline" size={26} color="#8e8e93" />
                </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Cart')}
                        style={styles.tabItemActive}
                        color = '#8e8e93'
                    >
                        <Icon name="cart-outline" size={26} color="#F5A623" />
                    </TouchableOpacity>
            </View>
        </View>
  );


  return (
    <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-back" size={30} color="#4A4A4A" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Your Cart</Text>
            <Text style={styles.thumbsUpEmoji}>👍</Text>
        </View>

        {cartItems.length > 0 ? (
            <FlatList
                data={cartItems}
                renderItem={({ item }) => <CartItem item={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContentContainer}
                showsVerticalScrollIndicator={false}
            />
        ):(
            <View style={styles.emptyCartContainer}>
                <Icon name="cart-off" size={80} color="#DADADA" />
                <Text style={styles.emptyCartText}>Your cart is empty.</Text>
                <Text style={styles.emptyCartSubText}>Looks like you haven't added anything to your cart yet.</Text>
            </View>
        )}

        {cartItems.length > 0 && (
            <View style={styles.footer}>
                <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalPrice}>$ {totalPrice.toLocaleString()}</Text>
                </View>
                <TouchableOpacity
                style={styles.checkoutButton}
                onPress={handleProceedToCheckout} // move to ChechOut.js
                >
                <Text style={styles.checkoutButtonText}>Proceed to checkout</Text>
                </TouchableOpacity>
            </View>
        )}
        </View>
        <View>
            <BottomTabBar/>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8', 
        marginTop: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF', 
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    backButton: {
        backgroundColor: '#F0F0F0',
        borderRadius: 12,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333333',
    },
    thumbsUpEmoji: {
        fontSize: 22,
        marginLeft: 8,
    },
    listContentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20, 
    },
    cartItemContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1},
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    itemImage: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginRight: 15,
        backgroundColor: '#F0F0F0',
    },
    itemDetails: {
        flex: 1,
    },
    itemBrand: {
        fontSize: 13,
        color: '#9B9B9B',
        marginBottom: 2,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4A4A4A',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#F5A623', 
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FDF4E8',
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
    quantityButton: {
        padding: 6,
    },
    itemQuantity: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginHorizontal: 10,
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
        marginBottom: 120
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    totalLabel: {
        fontSize: 18,
        color: '#4A4A4A',
        fontWeight: '500',
    },
    totalPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#F5A623',
    },
    checkoutButton: {
        backgroundColor: '#F5A623',
        paddingVertical: 16,
        borderRadius: 15,
        alignItems: 'center',
    },
    checkoutButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyCartText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 20,
        marginBottom: 8,
    },
    emptyCartSubText: {
        fontSize: 15,
        color: '#777',
        textAlign: 'center',
    },
    tabBarContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 95, 
        alignItems: 'center',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 65, 
        borderRadius: 32.5,
        position: 'absolute',
        bottom: 25,
        left: 15, 
        right: 15,
        shadowColor: '#a0a0a0',
        shadowOffset: { width: 0, height: -2 }, 
        shadowRadius: 8,
        elevation: 8,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', 
    },
    tabItemActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e0f2ff',
        borderRadius: 15, 
        paddingVertical: 6,
        marginHorizontal: 5, 
        position: 'relative',
    },
});

export default Cart;