import React from "react";
import { View, Modal, StyleSheet } from "react-native";

import styleConstants from "../assets/styleConstants";

import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Touchable from "./Touchable";

export default (ModalComponent = props => {
    /*
        PROPTYPES

        handleClose: PropTypes.func.isRequired
        children: PropTypes.node,
        showCloseIcon: PropTypes.bool,

        // style: PropTypes.node,
        // closeIconStyle: PropTypes.node,
    */

    const closeIcon = props.showCloseIcon && (
        <View
            style={[styles.closeIconContainer, props.closeIconContainerStyle]}>
            <Touchable
                onPress={props.handleClose}
                style={styles.closeIconButton}>
                <MaterialIcon
                    name="close"
                    style={[styles.closeIcon, props.closeIconStyle]}
                />
            </Touchable>
        </View>
    );

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
                onRequestClose={props.handleClose}>
                <View style={styles.wrapper}>
                    <View style={[styles.container, props.style]}>
                        {props.children}
                    </View>
                    {closeIcon}
                </View>
            </Modal>
        </View>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: styleConstants.transBlack,
    },
    container: {},
    closeIconContainer: {
        position: "absolute",
        top: 0,
        right: 0,
    },
    closeIconButton: {
        padding: 16,
    },
    closeIcon: {
        fontSize: styleConstants.regularFont,
        color: styleConstants.primary,
    },
});
