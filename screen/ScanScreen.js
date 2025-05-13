import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform, 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const ScanScreen = ({ navigation }) =>{
    return (
        <SafeAreaView>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F0E9"/>
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                        style = {styles.backButton}>
                        <Icon name = "arrow-back" size = {32} color = "#4A4A4A"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {styles.mainContent}>
                <Image
                    source = {require('../assets/example.png')}
                    style = {styles.image}
                    resizeMode='contain'
                />
            </View>
            <View style = {styles.addProduct}>
                <View style = {styles.thumbnailContainer}>
                    <Image
                        source = {require('../assets/example.png')}
                        style = {styles.thumbnailImage}
                        resizeMode='contain'
                    />
                </View>
                <View style = {styles.inforText}>
                    <View>
                        <Text style={styles.brandName}>Lauren's</Text>
                        <Text style={styles.productName}>Orange Juice</Text>
                    </View>
                    <TouchableOpacity
                        style = {styles.addButton}
                    >
                        <Icon name = 'add' size = {32} />
                    </TouchableOpacity>
                </View>
            </View>
            
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    safeArea:{
        flex: 1,
        backgroundColor: '#F5F0E9',
    },
    container: {
        marginLeft: 10,
        marginTop: 30
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 10, 
        paddingBottom: 20,
    },
    backButton: {
        padding: 6,
        backgroundColor: 'white',
        borderRadius: 12,
        marginTop: 20,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    timeText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4A4A4A',
    },
    mainContent: {
        width: '100%',
        aspectRatio: 3/5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    image: {
        width: screenWidth * 2.5, 
        height: screenHeight * 2.5,
        zIndex: -1
    },
    addProduct:{ 
        position: 'absolute',
        bottom: -65,
        left: '5%',
        right: '5%', 
        backgroundColor: 'white',
        borderRadius: 18,
        paddingVertical: 15,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
    }, 
    thumbnailContainer: {
        width: 48,
        height: 72,
        borderRadius: 10,
        marginRight: 15,
        backgroundColor: '#FDF6EC',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 4,
    },
    thumbnailImage:{
        width: '200%',
        height: '200%'
    },
    inforText:{
        flex: 1,
        flexDirection: 'row'
    },
    brandName:{
        fontSize: 13,
        color: '#A0A0A0',
        marginBottom: 3,
    },
    productName:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333333'
    },
    addButton:{
        backgroundColor: '#5D5FEF',
        width: 46,
        height: 46,
        borderRadius: 15,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:100,
    }
})

export default ScanScreen;