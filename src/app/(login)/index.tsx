import { dbg } from "@/util/debug";
import { auth } from "@/util/firebase";
import { Redirect, useRouter } from "expo-router";
import { Slot } from "expo-router";
import { type UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const dummyLogin = {
    email: "dummy@dummy.com",
    password: "dummypass",
};

export default function LoginScreen() {
    dbg("RENDER", "LoginScreen");

    const router = useRouter();

    if (auth.currentUser !== null) return <Redirect href="(app)/today" />;

    const successfulLogin = async (userCredential: UserCredential) => {
        const user = userCredential.user;
        auth.updateCurrentUser(user);
        router.replace("(app)/today");
    };

    // biome-ignore lint: "any" is used to handle firebase errors
    const handleError = async (error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    };

    const register = async () => {
        createUserWithEmailAndPassword(auth, dummyLogin.email, dummyLogin.password)
            .then((userCredential) => {
                dbg("AUTH", "REGISTERED NEW USER");
                successfulLogin(userCredential);
            })
            .catch((error) => {
                handleError(error);
            });
    };

    const login = async () => {
        signInWithEmailAndPassword(auth, dummyLogin.email, dummyLogin.password)
            .then((userCredential) => {
                dbg("AUTH", "LOGGED IN NEW USER");
                successfulLogin(userCredential);
            })
            .catch((error) => {
                handleError(error);
            });
    };

    return (
        <SafeAreaView>
            <View className="flex-row">
                <TouchableOpacity onPress={register}>
                    <Text>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={login}>
                    <Text>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
