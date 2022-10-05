import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import {
  useTheme,
  Button,
  Headline,
  Provider as PaperProvider,
  TextInput,
  Text
} from 'react-native-paper'
import DropDown from 'react-native-paper-dropdown'
import Constants from 'expo-constants'
import { useState } from 'react'

export default function App () {
  const [amount, setAmount] = useState('')
  const [interest, setInterest] = useState('5.00')
  const [payment, setPayment] = useState(0)
  const [time, setTime] = useState('1')
  const [showDropDown, setShowDropDown] = useState(false)

  const { colors } = useTheme()

  const years = Array(20)
    .fill('')
    .map((_, i) => ({ label: `${i + 1} years`, value: `${i + 1}` }))

  const IsNumeric = (value, message) => {
    if (value.length === 0 || isNaN(value) === true) {
      alert(message)
      return false
    }
    return true
  }

  const calculate = () => {
    const formattedInterest = interest.replace(',', ',')

    if (IsNumeric(amount,'Type in amount as number')===false) return
    if (IsNumeric(formattedInterest,'Type in interest as number')===false) return

 /*    if (amount.length === 0 || isNaN(amount) === true) {
      alert('Type in amount as number')
      return
    }

    if (interest.length === 0 || isNaN(formattedInterest) === true) {
      alert('Type in interest as number')
      return
    } */

    const months = time * 12
    const interestPerMonth = formattedInterest / 12
    const divider =
      (Math.pow(1 + interestPerMonth / 100, months) * interestPerMonth) / 100
    const divident = Math.pow(1 + interestPerMonth / 100, months) - 1
    setPayment((divider / divident) * amount)
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.form}>
          <Headline style={[styles.headline, { color: colors.primary }]}>
            Annuity loan
          </Headline>
          <TextInput
            label='Amount'
            mode='outlined'
            style={styles.field}
            keyboardType='numeric'
            value={amount}
            onChangeText={setAmount}
          />
          <TextInput
            label='Interest'
            mode='outlined'
            style={styles.field}
            keyboardType='numeric'
            value={interest}
            onChangeText={setInterest}
          />
          <DropDown
            label={'Time'}
            mode={'outlined'}
            value={time}
            setValue={setTime}
            list={years}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
          />
          <Text style={[styles.output, { color: colors.primary }]}>
            {payment.toFixed(2)} €
          </Text>
          <Button onPress={calculate} mode='contained'>Calculate</Button>
        </View>
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.StatusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginRight: 16,
    marginLeft: 16
  },
  headline: {
    marginTop: 16,
    marginBottom: 16
  },
  form: {
    alignSelf: 'stretch'
  },
  field: {
    marginBottom: 16
  },
  output: {
    marginTop: 16,
    marginBottom: 24,
    fontSize: 20,
    fontWeight: 'bold'
  }
})
