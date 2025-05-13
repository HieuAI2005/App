import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions, 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');
const cardMargin = 15;
const cardWidth = (width - cardMargin * 3) / 2;

const HomeScreen = ({ navigation }) => {
    const userName = 'Christie Doe';

    const insightsData = [
        {
            id: '1',
            icon: 'scan-outline', 
            iconBgColor: '#e6e6ff', 
            iconColor: '#8a2be2', 
            title: 'Scan new',
            subtitle: 'Scanned 483',
        },
        {
            id: '2',
            icon: 'alert-triangle-outline', 
            iconBgColor: '#ffe6e6', 
            iconColor: '#ff4500',  
            title: 'Counterfeits',
            subtitle: 'Counterfeited 32',
        },
        {
            id: '3',
            icon: 'checkmark-circle-outline',
            iconBgColor: '#e0f8f0',
            iconColor: '#32cd32', 
            title: 'Success',
            subtitle: 'Checkouts 8',
        },
        {
            id: '4',
            icon: 'calendar-outline',
            iconBgColor: '#e0f2ff', 
            iconColor: '#1e90ff', 
            title: 'Directory',
            subtitle: 'History 26',
        },
    ];
    const exploreData = [
        {
            id: '1',
            imageSource: require('../assets/card1.jpg'),
        },
        {
            id: '2',
            imageSource: require('../assets/card2.jpg'),
        },
        {
            id: '3',
            imageSource: require('../assets/card3.jpg'),
        },
    ];

    const InsightCard = ({ item }) => (
        <TouchableOpacity style={styles.insightCard}>
            <View style={[styles.iconContainer, { backgroundColor: item.iconBgColor}]}>
                <Icon name={item.icon} size={30} color={item.iconColor} />
            </View>
            <Text style={styles.insightTitle}>{item.title}</Text>
            <Text style={styles.insightSubtitle}>{item.subtitle}</Text>
        </TouchableOpacity>
    );

    const ExploreCard = ({ item, style }) => (
        <View style={[styles.exploreCard, style]}>
            <Image
                source={item.imageSource} 
                style={styles.exploreImage}
                resizeMode="contain" 
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View>
                <Text style={styles.greeting}>Hello 👋</Text>
                <Text style={styles.userName}>{userName}</Text>
                </View>
                <Image
                    source={require('../assets/avatar.jpg')}
                    style={styles.profilePic}
                />
            </View>


            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your Insights</Text>
                <View style={styles.insightsGrid}>
                    {insightsData.map((item) => (
                        <InsightCard key={item.id} item={item} />
                    ))}
                </View>
            </View>


            <View style={styles.section}>
                <View style={styles.exploreHeader}>
                    <Text style={styles.sectionTitle}>Explore More</Text>
                    <TouchableOpacity>
                        <Icon name="arrow-forward-outline" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exploreScroll}>
                    {exploreData.map((item) => (
                        <ExploreCard
                            key={item.id}
                            item = {item}
                        />
                    ))}
                </ScrollView>
            </View>
            </ScrollView>


            <View style={styles.tabBarContainer}>
                <View style={styles.tabBar}>
                <TouchableOpacity style={styles.tabItemActive}>
                    <Icon name="home" size={26} color="#007AFF" />
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
                    style={styles.tabItem}
                >
                    <Icon name="cart-outline" size={26} color="#8e8e93" />
                </TouchableOpacity>
                </View>
            </View>
            </SafeAreaView>
        );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 15
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: cardMargin,
        paddingTop: 15,
        paddingBottom: 20,
    },
    greeting: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1c1c1e',
    },
    userName: {
        fontSize: 16,
        color: '#8e8e93',
        marginTop: 2,
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    section: {
        paddingHorizontal: cardMargin,
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1c1c1e',
        marginBottom: 15,
    },
    insightsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    insightCard: {
        width: cardWidth,
        backgroundColor: '#f8f9fa',
        borderRadius: 18,
        padding: 15,
        marginBottom: cardMargin, 
        alignItems: 'flex-start', 
        shadowColor: '#bdbdbd',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 3,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 15, 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    insightTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1c1c1e',
        marginBottom: 4,
    },
    insightSubtitle: {
        fontSize: 13,
        color: '#8e8e93',
    },
    exploreHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    exploreCard: {
        borderRadius: 20,
        backgroundColor: '#e9ecef',
        shadowOffset: { width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    exploreImage: {
        width: 400,
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
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
        left: cardMargin, 
        right: cardMargin,
        shadowColor: '#a0a0a0',
        shadowOffset: { width: 0, height: -2}, 
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
    exploreScroll:{
        width: 370,
        height: 350,
        borderRadius: 60,
    }
});

export default HomeScreen;