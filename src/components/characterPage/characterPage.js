import React from 'react';
import {Col, Row} from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';

const RowBlock = ({left, right}) => {
    return (
        <Row>
            <Col md='6'>
                {itemList}
            </Col>
            <Col md='6'>
                {charDetails}
            </Col>
        </Row>
    )
}

export default class CharacterPage extends React.Component {

    gotService = new gotService()

    state = {
        selectedChar: 130,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList
                onCharSelected={this.onCharSelected}
                getData={this.gotService.getAllCharacters} 
                renderItem={({name, gender}) => `${name} (${gender})`}
            />
        )

        const charDetails = (
            <CharDetails charId={this.state.selectedChar} />
        )

        return (
            <RowBlock/>
        )
    }
}