import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.small,
    marginBottom: SIZES.small / 2
  },
  containerTabs: {
    width: '100%',
    flexDirection: 'row',
    gap: 7,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  tabsBox: {
    flex: 1,
    width: '25%',
    backgroundColor: "#F3F4F8",
    boxSizing: 'border-box',
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.xSmall,
    borderRadius: SIZES.medium,
  },
  containerMobile: {
    width: '100%',
    marginTop: SIZES.small,
    marginBottom: SIZES.small / 2,
    backgroundColor: "#F3F4F8",
    borderRadius: SIZES.medium,
    padding: SIZES.xSmall,
  },
  logoImage: {
    width: 20,
    height: 20,
  },
  btn: {
    width: '25%',
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xLarge,
    marginLeft: 2,
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  tabsText: {
    fontFamily: "DMMedium",
    fontSize: SIZES.small,
    color: "#AAA9B8",
    marginTop: 5
  },
});

export default styles;
