import { StyleSheet } from "react-native";

import { COLORS, SIZES, FONT } from "../../../constants";

const styles = StyleSheet.create({
  buttonDelete: {
    alignSelf: 'flex-end',
    width: '100%',
    marginTop: SIZES.small,
    marginBottom: SIZES.small / 2,
    borderRadius: SIZES.medium,
    padding: SIZES.small,
    backgroundColor: COLORS.red
  },
  btnText: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
  }
});

export default styles;