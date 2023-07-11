import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  photoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.circle,
    justifyContent: "center",
    alignItems: "center",
  },
  photoImage: {
    width: "100%",
    borderRadius: SIZES.circle,
    height: "100%",
    objectFit: 'cover'
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  userName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  }
});

export default styles;
