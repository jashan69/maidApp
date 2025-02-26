import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {View,StyleSheet,Text,Dimensions,Alert,ActivityIndicator, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';
import {TextInput} from 'react-native-paper';

//actions
import * as manageActions from '../../store/action/ManageUser';

//icons
import { FontAwesome } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';

const MaidProfileScreen = props => {
    const[isLoading,setIsLoading] =useState(false);
    
    const dispatch = useDispatch();
    const maid = useSelector(state=>state.manage.maids); 


    const loadMaid = useCallback(async()=>{
        setIsLoading(true);
            console.log('start')
            await dispatch(manageActions.fetchMaid())
                
           
            setIsLoading(false);
     },[dispatch])

    
      //console.log(maid);
    //console.log(maid[0].work);
     


    useEffect(()=>{
        loadMaid();
    },[dispatch,loadMaid])

    useEffect(()=>{
        const willFocusSub = props.navigation.addListener('willFocus',loadMaid);

        return () =>{
            willFocusSub.remove();
        }
   },[loadMaid,dispatch])

    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size='large' color='#e2703a'/>
            </View>
        )
    }

    if(!isLoading && Array.isArray(maid) && maid.length == 0){
        return(<View style={styles.centered}>
                <View >
                <Text>You Haven't Registered As A Maid Yet</Text>
                <View>
                <Button color='black' compact={true} mode="contained" onPress={() =>props.navigation.navigate('MaidSec')}>
           Register As Maid
           </Button>
                 </View>
                 </View>
                </View>
            
        )
    }

    if(!isLoading && Array.isArray(maid) && maid.length != 0){
        return(
            <SafeAreaView style={{height:Dimensions.get('window').height, 
            width:Dimensions.get('window').width}}>
                <ScrollView>
                <View style={{padding:10}}>
                <FontAwesome style={{alignSelf:'center',marginVertical:10}} name="user" size={90} color="#e2703a" />
                <Button color='orange' compact={true} mode="contained" onPress={loadMaid}>
               Refresh
               </Button>
                </View>
                 <View>
                    <TextInput
                    mode='outlined'
                    style={styles.input}
                    value={maid[0].name}
                    disabled={true}
                    theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                    label='Enter Name'
                    />
                    <TextInput
                    mode='outlined'
                    style={styles.input}
                    value={maid[0].phone}
                    disabled={true}
                    keyboardType='phone-pad'
                    theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                    label='Phone No. 91+'
                    />
                     <TextInput
                    mode='outlined'
                    style={styles.input}
                    value={'₹'+maid[0].price}
                    keyboardType='phone-pad'
                    disabled={true}
                    theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                    label='Your Base Price'
                    />
                    <TextInput
                    disabled={true}
                    mode='outlined'
                    style={styles.input}
                    value={maid[0].from}
                    theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                    label='Available From'
                    />
                    <TextInput
                    disabled={true}
                    mode='outlined'
                    style={styles.input}
                    value={maid[0].till}
                    theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                    label='Available Till'
                    />
                    <TextInput
                    disabled={false}
                    mode='outlined'
                    style={styles.input}
                    value={maid[0].address}
                    theme={{colors:{primary:"#ba8f54",underlineColor:'transparent'}}}
                    label='Address'
                    numberOfLines={1}
                    multiline={false}
                    /> 
                    {/* <View style={{marginLeft:39}}><Text style={{fontSize:15,fontWeight:'200'}}>Work:</Text></View> */}
                    <View style={{flexDirection:'row',alignSelf:'center'}}>
                        
                   {maid[0].work.map((kaam) => <View key={maid[0].work.indexOf(kaam)} style={{borderWidth:1,marginHorizontal:5,padding:5,borderRadius:10}}>
                        <Text  style={{fontWeight:'bold',margin:2}}>{kaam}</Text>
                        </View>)} 
                    </View>
    
                     
            
                </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
    else{
        return(
            <View style={styles.centered}>
                <ActivityIndicator size='large' color='#e2703a'/>
            </View>
        )
    }


};

MaidProfileScreen.navigationOptions = () => {
    return{
        header:()=>{
            return false
        }
    }
}

const styles= StyleSheet.create({
    input:{
        width:Dimensions.get('window').width*0.85,
        margin:15,
        fontFamily:'bold',
        height:Dimensions.get('window').height*0.059,
        backgroundColor:'#ffffff',
        alignSelf:'center',
        position:'relative',
        borderRadius:10,
        fontSize:17
    },
    centered:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    Addressinput:{
        width:Dimensions.get('window').width*0.85,
        margin:15,
        fontFamily:'bold',
        height:Dimensions.get('window').height*0.07,
        backgroundColor:'#ffffff',
        alignSelf:'center',
        position:'relative',
        borderRadius:10,
        fontSize:14
    }
})
export default MaidProfileScreen;