import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class StockSelector extends React.Component {
    state = {
        selectedOption: '',
        selectedValue: this.props.selectedValue
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        this.setState({ selectedValue: selectedOption.value });
        this.props.onStockChange(selectedOption.value);
        console.log(`Selected: ${selectedOption.value}`);
    }
    componentDidMount() {
        this.setState({ selectedValue: this.props.selectedValue });
        this.setState({ selectedOption: this.props.selectedValue });
    }
    render() {
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;


        return (
            <Select
                name="stock-selector"
                onChange={this.handleChange}
                options={this.props.selection}
                value={this.state.selectedOption}
            />
        );
    }
}