import React from 'react';
import axios from 'axios';
import '../styles/Form.css'

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Province: 1000,
            Livingarea: 0,
            PropertyType: "HOUSE",
            Bedroom: 0,
            Garden: false,
            EquippedKitchen: false,
            Furnished: false,
            prediction: 0

        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeSurface = this.handleChangeSurface.bind(this)
        this.handleChangeZipCode = this.handleChangeZipCode.bind(this)
        this.handleChangeProperty = this.handleChangeProperty.bind(this)
        this.handleGarden = this.handleGarden.bind(this)
        this.handleKitchen = this.handleKitchen.bind(this)
        this.handleFurnished = this.handleFurnished.bind(this)
        this.handleChangeRooms = this.handleChangeRooms.bind(this)
    }

    handleClick() {
        console.log(this.state);

        if (this.state.toComplete === true) {
            this.setState({ toComplete: false })

        } else {
            this.setState({ toComplete: true })

        }

    }

    handleChangeRooms = event => {
        this.setState({ Bedroom: parseInt(event.target.value) });
    }
    handleChangeSurface = event => {
        this.setState({ Livingarea: event.target.value });
    }
    handleChangeProperty = event => {
        this.setState({ PropertyType: event.target.value });
    }
    handleChangeZipCode = event => {
        this.setState({ Province: event.target.value });
    }
    handleGarden = event => {
        this.setState({ Garden: event.target.value });
    }
    handleKitchen = event => {
        this.setState({ EquippedKitchen: event.target.value });
    }
    handleFurnished = event => {
        this.setState({ Furnished: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();

        console.log(this.state);

        if (this.state.toComplete === true) {
            this.setState({ toComplete: false })

        } else {
            this.setState({ toComplete: true })

        }

        axios.post('https://salty-mesa-39646.herokuapp.com/predict',
            {
                'data': {
                    'area': parseInt(this.state['Livingarea']),
                    'zip-code': parseInt(this.state['Province']),
                    'property-type': this.state['PropertyType'],
                    'rooms-number': parseInt(this.state['Bedroom']),
                    'garden': this.state['Garden'],
                    'furnished': this.state['Furnished'],
                    'equipped-kitchen': this.state['EquippedKitchen']
                }
            }).then(response => {
                console.log(response)
                this.setState({ prediction: response.data.prediction })
            })
            .catch((err) => { console.log(err) })
    }

    render() {

        if (this.state.toComplete) {
            return (
                <div className='form'>
                    <p>For a {this.state.PropertyType} of {this.state.Bedroom} rooms in {this.state.Province}, the price prediction is {this.state.prediction} €</p>
                    <button type='button' value='Search' onClick={() => this.handleClick()}>Go back</button>
                </div>
            )
        }
        else {
            return (
                <div className='form'>
                    <form id='form' onSubmit={this.handleSubmit}>
                        <div className='label'>
                            <label htmlFor="Bedroom"> Number of rooms : </label>
                            <select name='Bedroom' id='Bedroom' form='form' onChange={this.handleChangeRooms}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                            </select>
                        </div>
                        <div className='label'>
                            <label htmlFor="Livingarea"> Living area (m²): </label>
                            <input type='text' id='Livingarea' name='Livingarea' onChange={this.handleChangeSurface} required></input>
                        </div>
                        <div className='label'>
                            <label htmlFor="PropertyType"> Property type : </label>
                            <select type='text' id='PropertyType' name='PropertyType' onChange={this.handleChangeProperty} required>
                                <option value='HOUSE'>House</option>
                                <option value='APARTMENT'>Appartment</option>
                            </select>
                        </div>
                        <div className='label'>
                            <label htmlFor="Province"> Province : </label>
                            <select type='number' id='Province' name='Province' onChange={this.handleChangeZipCode} required>
                                <option value='1000'>1000 Brussels</option>
                                <option value='2000'>2000 Antwerpen</option>
                                <option value='3000'>3000 Limburg</option>
                                <option value='4000'>4000 Liège</option>
                                <option value='5000'>5000 Namur</option>
                                <option value='6000'>6000 Luxembourg</option>
                                <option value='7000'>7000 Hainaut</option>
                                <option value='8000'>8000 West-Vlanderen</option>
                                <option value='9000'>9000 Oost-Vlanderen</option>

                            </select>
                        </div>
                        <div className='label'>
                            <label htmlFor="Garden"> Garden : </label>
                            <input name="Garden" type="checkbox" defaultChecked={this.state.Garden} onChange={this.handleGarden} />
                        </div>
                        <div className='label'>
                            <label htmlFor="Furnished"> Furnished : </label>
                            <input name="Furnished" type="checkbox" defaultChecked={this.state.Furnished} onChange={this.handleFurnished} />
                        </div>
                        <div className='label'>
                            <label htmlFor="EquippedKitchen"> Equipped kitchen : </label>
                            <input name="EquippedKitchen" type="checkbox" defaultChecked={this.state.EquippedKitchen} onChange={this.handleKitchen} />
                        </div>
                        <div className='label'>
                            <button type='submit' value='Search'>See the price prediction</button>
                        </div>

                    </form>
                </div>
            )
        }

    }
}

