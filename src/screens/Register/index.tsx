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

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

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

    function handleRegister(){
        const data = {
            name,
            amount,
            transactionType,
            category: category.key
        }
        console.log(data);
    }


    return (
       <Container>
           <Header>
               <Title>Cadastro</Title>
           </Header>
           <Form>
               <Fields>
                    <Input placeholder='Nome' onChangeText={setName}/>
                    <Input placeholder='Preço' onChangeText={setAmount}/>
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
                
                <Button title = "Enviar" onPress={handleRegister}/>
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
