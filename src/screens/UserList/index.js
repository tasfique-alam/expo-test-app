import React from "react"
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Block from "../../components/Block";
import Text from "../../components/Text"
import { colors } from "../../styles/theme";
import { Navbar } from "../../components/Navbar";
import { AntDesign, Ionicons } from '@expo/vector-icons';

const UserList = ({ route }) => {

  const { data, filteredUsers } = route?.params;
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [search, setSearch] = useState([]);

  const getUserTag = (userId) => {
    const filteredUser = filteredUsers;
    const userIdIndex = filteredUser.findIndex((u) => u?.id === userId);

    if (userIdIndex > -1) {
      return filteredUser[userIdIndex]?.tag;
    }

    return null;
  };

  useEffect(() => {
    setAllUsers(data);
  }, []);

  const onChangeSearch = (val) => {
    setSearch(val);
    if (val === '') {
      setSearchedUsers(allUsers);
      return;
    }

    const matchedUsers = allUsers.length > 0 && allUsers.filter((obj) => JSON.stringify(obj.profile?.name).toLowerCase().includes(val.toLowerCase()));
    setSearchedUsers(matchedUsers);
  };

  const render_item = ({ item }) => (
    <Block style={styles.block}>
      <Block flex={false} style={{
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: getUserTag(item?.id) == 'Bored' ? 'Red' : colors.primary,
        padding: 5,
        zIndex:99
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
            <TextInput value={search} onChangeText={(val)=> onChangeSearch(val)} placeholder="Search by name" style={{ width: '90%', paddingLeft: 10 }} />
          </Block>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchedUsers?.length > 0 && searchedUsers}
            contentContainerStyle={{ paddingBottom: 300 }}
            numColumns={2}
            extraData={searchedUsers?.length > 0 && searchedUsers}
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
    position: 'relative',
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
