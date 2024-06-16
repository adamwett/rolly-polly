import { Ionicons } from "@expo/vector-icons";

type TabBarIconProps = {
    name: keyof typeof Ionicons.glyphMap
    focused: boolean
    color: string
};



const TabBarIcon = (props: TabBarIconProps) => {
    return (
        <Ionicons
            name={props.name}
            size={24}
            style={{ marginBottom: -3 }}
            color={props.focused ? props.color : "gray"}
        />
    );
}

export { TabBarIcon };
