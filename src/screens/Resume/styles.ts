import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export const Container = styled(GestureHandlerRootView)`
    background-color: ${({theme}) => theme.colors.background};
    flex: 1;
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.primary};

    width: 100%;
    height: ${RFValue(113)}px;

    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;

export const Title = styled.Text`
    font-family: ${({theme})=>theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({theme}) => theme.colors.shape};

`;