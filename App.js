import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import PhoneInput from "react-native-phone-number-input";
import { API_KEY } from "@env";

const App = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    mobile: "",
    countryCode: "",
    email: "",
    password: "",
    confirmPassword: "",
    profession: "",
    college_id:""
  });

  const [dropdowns, setDropdowns] = useState({
    professionOpen: false,
    genderOpen: false,
  });

  const genderItems = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

const professionItems = [
  { label: "Android Development", value: "Android Development" },
  { label: "Campus Radio", value: "Campus Radio" },
  { label: "Campus TV", value: "Campus TV" },
  { label: "Content Writer", value: "Content Writer" },
  { label: "Coordination", value: "Coordination" },
  { label: "CSR", value: "CSR" },
  { label: "Data Science", value: "Data Science" },
  { label: "Design smc", value: "Design smc" },
  { label: "Designer", value: "Designer" },
  { label: "Digital Marketing", value: "Digital Marketing" },
  { label: "Gaming", value: "Gaming" },
  { label: "Management", value: "Management" },
  { label: "Masscom", value: "Masscom" },
  { label: "Operations", value: "Operations" },
  { label: "Product Design", value: "Product Design" },
  { label: "Software Testing", value: "Software Testing" },
  { label: "Telemarketing", value: "Telemarketing" },
  { label: "Web Development", value: "Web Development" },
];

  const handleSubmit = async () => {
    const { fullName, gender, mobile, countryCode, email, password, confirmPassword, profession,college_id } = formData;

    if (!fullName || !gender || !mobile || !email || !password || !confirmPassword || !profession || !college_id) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    // Create payload
    const payload = {
      entity: "student",
      full_name: fullName,
      gender:gender,
      country_code: countryCode,
      mobile:mobile,
      email:email,
      pwd: password,
      confirm_pwd: confirmPassword,
      college_id: college_id,
      profession:profession,
      api_key: API_KEY, 
    };
    console.log(JSON.stringify(payload))
    try {
      const response = await fetch(
        "https://dev.startupworld.in/Webservices2/api5.php?action=student_registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (result.status === "success" || result.responseStatus == 200) {
        
        Alert.alert("Success", "Registration successful!");
      } else {
        
        console.log(result.responseStatus);
        console.log("Error:", error.message);
        Alert.alert("Error", result.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(result.responseStatus);
      console.log("Error:", error.message);
      Alert.alert("Error", "Failed to connect to the server.");
    }
  };

  const handleMobileInput = (text) => {
    const countryCode = text.slice(0, text.length - 10);
    const mobile = text.slice(-10);
    setFormData((prevData) => ({ ...prevData, countryCode, mobile }));
  };

  return (
    <ScrollView style={styles.container}
    keyboardShouldPersistTaps="handled"
  scrollEnabled={!dropdowns.professionOpen && !dropdowns.genderOpen} // Disable scrolling when dropdown is open
  >
      
      <Image source={{ uri: "https://startupworld.in/image/theme/logo.png" }} style={styles.logo} />
      <Text style={styles.heading}>Registration Form</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        onChangeText={(text) => setFormData({ ...formData, fullName: text })}
        value={formData.fullName}
      />

      <Text style={styles.label}>Gender</Text>
      <DropDownPicker
        open={dropdowns.genderOpen}
        value={formData.gender}
        items={genderItems}
        setOpen={(open) => setDropdowns({ ...dropdowns, genderOpen: open })}
        setValue={(value) => setFormData({ ...formData, gender: value() })}
        placeholder="Select your gender"
        style={styles.dropdown}
      />

      <Text style={styles.label}>Mobile</Text>
      <PhoneInput
        defaultValue={formData.mobile}
        defaultCode="IN"
        layout="first"
        onChangeFormattedText={(text) => handleMobileInput(text)}
        withDarkTheme
        placeholder="Enter your mobile number"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        value={formData.email}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        value={formData.password}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry
        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
        value={formData.confirmPassword}
      />
      <Text style={styles.label}>College Name </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your College Name"
        onChangeText={(text) => setFormData({ ...formData, college_id: text })}
        value={formData.college_id}
      />

      <Text style={styles.label}>Profession</Text>
      
      <DropDownPicker
        open={dropdowns.professionOpen}
        value={formData.profession}
        items={professionItems}
        setOpen={(open) => setDropdowns({ ...dropdowns, professionOpen: open })}
        setValue={(value) => setFormData({ ...formData, profession: value() })}
        placeholder={"Select your profession" || text}
        style={styles.dropdown}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  logo: { width: "100%", height: 100, alignSelf: "center", marginBottom: 16 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "black" },
  label: { fontSize: 16, marginBottom: 8, color: "black" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 16, borderRadius: 8 },
  dropdown: { marginBottom: 16, zIndex: 1 },
  button: { backgroundColor: "#007bff", padding: 16, borderRadius: 8, alignItems: "center", marginTop: 16 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default App;



