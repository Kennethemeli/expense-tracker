import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { Link, useRouter } from 'expo-router';

import appColors from '../../assets/colors/appColors';
import apis from '../../assets/apis';
import { useContext } from 'react';
import AppContext from '../../context/appcontext';

import images from '../../assets/images';
import KeyboardHandler from '../../components/generals/KeyboardHandler';

const colors = appColors;
export default function SignUp() {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const appC =  useContext(AppContext);
  const { signUser , setLoading} = appC;

  const handleSignUp = () => {
    // Handle sign-in logic
    setLoading(true);
    fetch(apis.signup, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        pswd: password,
        name:name
      })
    }).then(
      async x => {
        var resu = await x.json();
        alert(resu.message);
        if (resu.status) {
          await signUser(resu.name,resu.token);
          router.replace("(home)");
        }
      }
    ).catch(e => {
      console.log(e);
      alert("Error processing request ");
    }).finally(
      () => {
        setLoading(false);
        console.log("finally");
      }
    )
  };

  return (
    <KeyboardHandler>
      <View style={styles.container}>
        <Image source={images.logo} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor={colors.lightGrey}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor={colors.lightGrey}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={colors.lightGrey}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        {/* <Link href="/forgotpassword" style={styles.link}> */}
        <Text style={styles.linkText}>Forgot Password?</Text>
        {/* </Link> */}
        <Link href="/signin" style={styles.link}>
          <Text style={styles.linkText}>Already have an account? Sign in</Text>
        </Link>
      </View>
    </KeyboardHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: colors.darkGrey,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: colors.primary,
    textAlign: 'center',
  },
});
