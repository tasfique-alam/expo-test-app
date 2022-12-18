import React, { useEffect, useState } from "react"
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView
} from "react-native";
import Block from "../../components/Block";
import Text from "../../components/Text"
import { colors } from "../../styles/theme";
import { Navbar } from "../../components/Navbar";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { data } from '../../data/TotalData'
import moment from 'moment'


const UserList = ({ navigation, route }) => {

  const { startDate, endDate, activeTag, superActiveTag, boredTag } = route?.params;

  const [dateFrom, setDateFrom] = useState(startDate)
  const [dateTo, setDateTo] = useState(endDate)
  const [superActive, setSuperActive] = useState(superActiveTag)
  const [active, setActive] = useState(activeTag)
  const [bored, setBored] = useState(boredTag)

  useEffect(() => {
    setDateFrom(startDate)
    setDateTo(endDate)
    setSuperActive(superActiveTag)
    setActive(activeTag)
    setBored(boredTag)
  }, [])

  function enumerateDaysBetweenDates(startDate, endDate) {
    let date = []
    while (moment(startDate) <= moment(endDate)) {
      date.push(startDate);
      startDate = moment(startDate).add(1, 'days').format("YYYY-MM-DD");
    }
    return date;
  }

  const filterData = () => {
    let filteredDates = enumerateDaysBetweenDates(dateFrom, dateTo);
    const filteredData = [];

    filteredDates?.forEach((date) => {
      data?.forEach((item) => {
        Object.keys(item?.calendar?.dateToDayId).forEach((key) => {
          if (key === date) {
            const dayId = item?.calendar?.dateToDayId[key];
            const dayData = {
              date,
              dayId,
              userId: item?.id,
              name: item?.profile?.name,
              pictureUrl: item?.profile?.pictureUrl,
              meals: [],
            };

            Object.keys(item?.calendar?.mealIdToDayId).forEach((mealIdAsKey) => {
              if (item?.calendar?.mealIdToDayId[mealIdAsKey] === dayId) {
                dayData.meals.push(mealIdAsKey);
              }
            });

            filteredData.push(dayData);
          }
        });
      });
    });

    const availableUsers = [];
    filteredData?.forEach((item) => {
      if (superActive) {
        if (item?.meals?.length >= 10) {
          const userIndex = availableUsers?.indexOf(item?.userId);
          if (userIndex === -1) {
            availableUsers.push({
              id: item?.userId,
              tag: "Super Active",
            });
            return;
          }
        }
      }

      if (active) {
        if (item?.meals?.length >= 5 && item?.meals?.length < 10) {
          const userIndex = availableUsers?.indexOf(item?.userId);
          if (userIndex === -1) {
            availableUsers.push({
              id: item?.userId,
              tag: "Active",
            });
            return;
          }
        }
      }

      if (bored) {
        if (item?.meals?.length < 5) {
          const userIndex = availableUsers?.indexOf(item?.userId);
          if (userIndex === -1) {
            availableUsers.push({
              id: item?.userId,
              tag: "Bored",
            });
          }
        }
      }
    });

    return availableUsers;
  };

  const getUserTag = (userId) => {
    const filteredUsers = filterData();
    const userIdIndex = filteredUsers.findIndex((u) => u?.id === userId);

    if (userIdIndex > -1) {
      return filteredUsers[userIdIndex]?.tag;
    }

    return null;
  };

  const filteredData = data.filter((item) => {
    const filteredUsers = filterData();
    const userIdIndex = filteredUsers.findIndex((u) => u?.id === item?.id);
    return userIdIndex > -1;
  });

  const render_item = ({ item }) => (
    <Block style={styles.block}>
      <Block style={{
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: getUserTag(item?.id) == 'Bored' ? 'Red' : colors.primary,
        padding: 5
      }}>
        <Text color="white">{getUserTag(item?.id)}</Text>
      </Block>
      <Image style={styles.img} source={{ uri: item?.profile?.pictureUrl }} />
      <Block padding={[10]}>
        <Text color={colors.inputTextColor}>{item?.profile?.name}</Text>
        <Text color={colors.inputTextColor}>{item?.id}</Text>
      </Block>
    </Block>
  );


  return (
    <>
      <Navbar back />
      <SafeAreaView contentContainerStyle={styles.wrapper}>
        <Block bgWhite center padding={[20]} style={{ flex: 1 }}>
          <TouchableOpacity style={styles.filter}>
            <Text color={colors.primary} size={15} bold>Edit Filter</Text>
            <Ionicons name="options-outline" size={24} color={colors.primary} />
          </TouchableOpacity>

          <Block center midddle row style={styles.searchBar}>
            <AntDesign name="search1" size={24} color={colors.inputTextColor} />
            <TextInput placeholder="Search by name" style={{ width: '90%', paddingLeft: 10 }} />
          </Block>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredData}
            contentContainerStyle={{ paddingBottom: 300 }}
            numColumns={2}
            extraData={filteredData}
            renderItem={render_item}
            scrollEventThrottle={0}
            keyExtractor={(item, index) =>
              index.toString()
            }
            onEndReachedThreshold={0.5}
            ListEmptyComponent={
              <Block>
                <Text>No data Found</Text>
              </Block>
            }
          />

        </Block>
      </SafeAreaView>
    </>

  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: 'white'
  },
  decs: {
    marginTop: 10,
    color: colors.inputTextColor
  },
  searchBar: {
    borderWidth: 1,
    borderColor: colors.primary,
    width: '100%',
    height: 40,
    paddingHorizontal: 20,
    marginVertical: 20
  },
  block: {
    width: '47%',
    elevation: 3,
    backgroundColor: 'white',
    height: 250,
    margin: 5,
    borderWidth: 1,
    borderColor: '#eee'
  },
  img: {
    width: '100%',
    height: 180,
    resizeMode: 'cover'
  },
  filter: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center'
  },
  wrapper: {
    flexGrow: 1,
    backgroundColor: 'white'
  },
  decs: {
    marginTop: 10,
    color: colors.inputTextColor
  },
  inputText: {
    color: colors.primary,
    marginRight: 10,
    width: 40
  },
  inputArea: {
    borderWidth: 1,
    borderColor: colors.primary,
    width: '100%',
    padding: 20,
    marginTop: 40
  },
  title: {
    borderBottomWidth: 1,
    borderBottomColor: colors.inputTextColor,
    marginBottom: 20
  },
  checkbox: {
    marginRight: 10
  },
  paragraph: {
    color: colors.inputTextColor
  },
  btn: {
    marginTop: 20,
    width: '50%',
    alignSelf: 'center'
  },
});

export default UserList;
