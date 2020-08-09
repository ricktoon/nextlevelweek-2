import React, { useState} from 'react';
import { View } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

import {useFocusEffect} from '@react-navigation/native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { ScrollView } from 'react-native-gesture-handler';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );
        setFavorites(favoritedTeachers);
      }
    });
  }

  useFocusEffect(
    React.useCallback(()=>{
    loadFavorites();
  },[])
  )

  return( 
  <View style={styles.container}>
    <PageHeader title="Meus proffys favoritos" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}>

          {favorites.map((teacher: Teacher)=>{
            return(
             <TeacherItem 
             key={teacher.id}
             teacher={teacher}
             favorited
             />
             
             );
          })}
      
      </ScrollView>
  </View>
  );
}

export default Favorites;