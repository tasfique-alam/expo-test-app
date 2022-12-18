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






export default Welcome = ({ navigation }) => {

  const [dateFrom, setDateFrom] = useState(new Date())
  const [openFrom, setOpenFrom] = useState(false)
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);


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
                  style={styles.checkbox} value={isChecked2}
                  onValueChange={setChecked2} />
                <Text style={styles.paragraph}>Super Active</Text>
              </Block>
              <Block row center margin={[10, 0, 0]}>
                <Checkbox
                  color={colors.primary}
                  style={styles.checkbox} value={isChecked3}
                  onValueChange={setChecked3} />
                <Text style={styles.paragraph}>Bored</Text>
              </Block>
            </Block>
            <PrimaryButton btnStyles={styles.btn} btnText="Generate" />
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