import React, { useEffect, useState } from "react"
import { ScrollView, StyleSheet } from "react-native";
import Block from "../../components/Block";
import Text from "../../components/Text"
import { PrimaryTextInput } from "../../components/TextInputs";
import { colors } from "../../styles/theme";
import DateTimePicker from '@react-native-community/datetimepicker';
import { genericDate } from "../../helpers/common";





export default Welcome = ({ navigation }) => {

  const [dateFrom, setDateFrom] = useState(new Date())
  const [openFrom, setOpenFrom] = useState(false)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

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

  return (
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
          </Block>
        </Block>
      </Block>
    </ScrollView>

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
    width:40
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
});