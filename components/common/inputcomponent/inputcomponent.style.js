import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        marginVertical: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    logoBox: {
        width: 150,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: SIZES.circle,
      },
    logoImage: {
        width: "100%",
        height: "100%",
        objectFit: 'cover',
        borderRadius: SIZES.circle,
    },
    jobTitleBox: {
        marginTop: SIZES.xSmall,
    },
    jobTitle: {
        fontSize: SIZES.medium,
        color: COLORS.primary,
        fontFamily: FONT.bold,
        textAlign: "center",
    },
    inputForm: {
        fontFamily: FONT.regular,
        width: "100%",
        height: "100%",
        paddingHorizontal: SIZES.medium,
    },
    inputWrapper: {
        width: '100%',
        flex: 1,
        backgroundColor: COLORS.white,
        marginRight: SIZES.small,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.medium,
        marginTop: SIZES.small,
        height: 50,
    },
    inputContainer:{
        width: '100%',
        flex: 1,
        marginTop: SIZES.small
    },
    photoContainer: {
    
    }
});

export default styles;