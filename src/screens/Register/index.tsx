import React, {useState} from 'react';
import { Modal } from 'react-native';

import {
    Container,
    Header, 
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

export function Register() {

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    const [transactionType, setTransactionType] = useState('');

    const [categoryModalOpen, setcategoryModalOpen] = useState(false);

    function handleTransactionTypeSelect (type: 'up' | 'down'){
        setTransactionType(type);
    }

    function handleCloseSelectCategoryModal(){
        setcategoryModalOpen(false);
    }

    function handleOpenSelectCategoryModal(){
        setcategoryModalOpen(true);
    }


    return (
       <Container>
           <Header>
               <Title>Cadastro</Title>
           </Header>
           <Form>
               <Fields>
                    <Input placeholder='Nome' />
                    <Input placeholder='Preço' />
                    <TransactionsTypes>
                        <TransactionTypeButton 
                            title="Income"
                            type="up"
                            onPress={() => handleTransactionTypeSelect ('up')}
                            isActive = { transactionType === 'up'}
                        />

                        <TransactionTypeButton 
                            title="Outcome"
                            type="down"
                            onPress={() => handleTransactionTypeSelect ('down')}
                            isActive = { transactionType === 'down'}
                        />
                    </TransactionsTypes>
                    <CategorySelectButton 
                        title={category.name} 
                        onPress = {handleOpenSelectCategoryModal}
                    />
                </Fields>
                
                <Button title = "Enviar" />
           </Form>
           <Modal visible={categoryModalOpen}>
               <CategorySelect 
                      category = {category}
                      setCategory = {setCategory}
                      closeSelectCategory ={handleCloseSelectCategoryModal}

               />
           </Modal>
       </Container>
    )
}
