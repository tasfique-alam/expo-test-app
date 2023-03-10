import React, { useEffect, useState } from "react"
import { ScrollView, StyleSheet } from "react-native";
import Block from "../../components/Block";
import Text from "../../components/Text"
import { PrimaryTextInput } from "../../components/TextInputs";
import { colors } from "../../styles/theme";
import DateTimePicker from '@react-native-community/datetimepicker';
import { genericDate } from "../../helpers/common";
import Checkbox from 'expo-checkbox';
import { PrimaryButton } from "../../components/Buttons";
import { Navbar } from "../../components/Navbar";
import { data } from '../../data/TotalData'
import moment from 'moment'


const FilterScreen = ({ navigation }) => {
  const [dateFrom, setDateFrom] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [openFrom, setOpenFrom] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [isCheckedSuper, setCheckedSuper] = useState(false);
  const [isCheckedBored, setCheckedBored] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpenFrom(false);
    setDateFrom(currentDate);
  };

  const onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate;
    setOpen(false);
    setDate(currentDate);
  };

  let filteredUsers;

  function enumerateDaysBetweenDates(startDate, endDate) {
    let date = []
    while (moment(startDate) <= moment(endDate)) {
      date.push(startDate);
      startDate = moment(startDate).add(1, 'days').format("YYYY-MM-DD");
    }
    return date;
  }

  const filterData = () => {
    let filteredDates = enumerateDaysBetweenDates(dateFrom, date);
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
      if (isCheckedSuper) {
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

      if (isChecked) {
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

      if (isCheckedBored) {
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
    const filteredDataArray = data.filter((item) => {
      filteredUsers = filterData();
      const userIdIndex = filteredUsers.findIndex((u) => u?.id === item?.id);
      setLoading(false)
      return userIdIndex > -1;
    });

    return filteredDataArray;
  };



  const handleClickGenerate = async () => {
     setLoading(true)
    const data = await filterData();
    navigation.navigate("UserList", {
      data: data,
      filteredUsers: filteredUsers
    });
  };




  return (
    <>
      <Navbar />
      <ScrollView contentContainerStyle={styles.wrapper}>
        <Block bgWhite center padding={[20]} style={{ flex: 1 }}>
          <Text color={colors.primary} size={20} bold>User Analyzer</Text>
          <Text style={styles.decs}>Select filters to generate report</Text>

          <Block style={styles.inputArea}>
            <Text color={colors.primary} size={20} medium style={styles.title}>Date</Text>
            <Block row center middle width>
              <Text style={styles.inputText}>From</Text>
              <PrimaryTextInput
                value={genericDate(dateFrom)}
                onFocus={() => setOpenFrom(true)}
              />
              {openFrom && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateFrom}
                  mode={'date'}
                  onChange={onChange}
                />
              )}
            </Block>
            <Block row center middle>
              <Text style={styles.inputText}>To</Text>
              <PrimaryTextInput
                value={genericDate(date)}
                onFocus={() => setOpen(true)}
              />
              {open && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  onChange={onChangeTo}
                />
              )}
            </Block>

            <Block>
              <Text color={colors.primary} size={20} medium style={styles.title}>Status</Text>
              <Block row center>
                <Checkbox
                  color={colors.primary}
                  style={styles.checkbox} value={isChecked}
                  onValueChange={setChecked} />
                <Text style={styles.paragraph}>Active</Text>
              </Block>
              <Block row center margin={[10, 0, 0]}>
                <Checkbox
                  color={colors.primary}
                  style={styles.checkbox} value={isCheckedSuper}
                  onValueChange={setCheckedSuper} />
                <Text style={styles.paragraph}>Super Active</Text>
              </Block>
              <Block row center margin={[10, 0, 0]}>
                <Checkbox
                  color={colors.primary}
                  style={styles.checkbox} value={isCheckedBored}
                  onValueChange={setCheckedBored} />
                <Text style={styles.paragraph}>Bored</Text>
              </Block>
            </Block>
            <PrimaryButton btnStyles={styles.btn} loading={loading} btnText="Generate" onPress={handleClickGenerate} />
          </Block>
        </Block>
      </ScrollView>
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

export default FilterScreen;
