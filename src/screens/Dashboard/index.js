import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Block from "../../components/Block";
import Text from "../../components/Text"
import { colors } from "../../styles/theme";
import { Navbar } from "../../components/Navbar";
import { AntDesign, Ionicons } from '@expo/vector-icons';


const data = [
  { id: 1 },
  { id: 2 },
  { id: 1 },
  { id: 2 },
  { id: 1 },
  { id: 2 },
  { id: 1 },
  { id: 2 },
]



export default Dashboard = ({ navigation }) => {

  const [shouldFetchMore, setShouldFetchMore] = useState(true)
  const [isFetching, setIsFetching] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const render_item = ({ item }) => (
    <Block style={styles.block}>
      <Image style={styles.img} source={require('../../assets/images/avatar.png')} />
      <Block padding={[10]}>
        <Text color={colors.inputTextColor}>Tasfique Alam</Text>
        <Text color={colors.inputTextColor}>3843545396</Text>
      </Block>
    </Block>
  );

  const onRefresh = () => {

  }

  const onLoadMore = () => {
  }


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
            data={data}
            contentContainerStyle={{ paddingBottom: 300 }}
            numColumns={2}
            extraData={data}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={onRefresh}
              />
            }
            renderItem={render_item}
            scrollEventThrottle={0}
            keyExtractor={(item, index) =>
              index.toString()
            }
            onRefresh={onRefresh}
            refreshing={isFetching}
            onEndReachedThreshold={0.5}
            onEndReached={onLoadMore}
            ListEmptyComponent={
              <Block>
                <Text>No data Found</Text>
              </Block>
            }
            ListFooterComponent={
              shouldFetchMore &&
              data?.length != 0 && (
                <Block>
                  <ActivityIndicator
                    size="small"
                    color={colors.primary}
                  />
                </Block>
              )
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
});