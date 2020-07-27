import React from 'react';
import {Col, Row, Container, Button} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage'
import CharacterPage from '../characterPage'
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import gotService from '../../services/gotService'


export default class App extends React.Component {

    gotService = new gotService()

    state = {
        randomChar: true,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                randomChar: !state.randomChar
            }
        })
    }

    render() {
        const randomChar = this.state.randomChar ? <RandomChar/> : null

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {randomChar}
                            <Button color='primary' className='' onClick={this.toggleRandomChar}>Toggle Random Char</Button>
                        </Col>
                    </Row>
                    
                </Container>
                <CharacterPage/>
                <Row>
                    <Col md='6'>
                        <ItemList
                            onCharSelected={this.onCharSelected}
                            getData={this.gotService.getAllBooks}
                            renderItem={(item) => item.name} 
                        />
                    </Col>
                    <Col md='6'>
                        <CharDetails charId={this.state.selectedChar} />
                    </Col>
                </Row>
                <Row>
                    <Col md='6'>
                        <ItemList
                            onCharSelected={this.onCharSelected}
                            getData={this.gotService.getAllHouses} 
                            renderItem={(item) => `${item.name}`}
                        />
                    </Col>
                    <Col md='6'>
                        <CharDetails charId={this.state.selectedChar} />
                    </Col>
                </Row>
            </>
        );
    }
};
