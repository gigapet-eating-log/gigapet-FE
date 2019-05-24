import React, { Component } from 'react';
import { FormSC, TitleSC, InputBoxSC, SelectSC, OptionSC, ButtonBoxSC, InputButtonSC } from './AddEntry';


class SortDateFormCategory extends Component {
    constructor() {
        super();
        this.state = {
            input: {
                category: "x"
            }
        }
    }

    changeHandler = ev => {
        this.setState({
            input: { ...this.state.input, [ev.target.name]: ev.target.value }
        });
    };

    render() {
        return (
            <div className='advanced-search'>
                <FormSC onSubmit={this.submitHandler}>
                    <TitleSC>Search by Category</TitleSC>
                    <InputBoxSC spellCheck="false">

                        <SelectSC
                            placeholder={this.state.input.category === "x"}
                            name="category"
                            value={this.state.input.category}
                            onChange={this.changeHandler}
                            required
                        >
                            <OptionSC value="x" hidden>
                                Category
                            </OptionSC>
                            <OptionSC value="vegetables">Vegetables</OptionSC>
                            <OptionSC value="fruits">Fruits</OptionSC>
                            <OptionSC value="grains">Grains</OptionSC>
                            <OptionSC value="dairy">Dairy</OptionSC>
                            <OptionSC value="proteins">Proteins</OptionSC>
                            <OptionSC value="junk">Junk</OptionSC>
                        </SelectSC>

                    </InputBoxSC>
                    <ButtonBoxSC>
                        <InputButtonSC onClick={this.submitHandler}>
                            Find
                    </InputButtonSC>
                    </ButtonBoxSC>
                </FormSC>

                <div className='card-container'>

                </div>

            </div>

           
        );
    }
}

export default SortDateFormCategory;