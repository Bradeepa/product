import React, {useEffect} from 'react';
const Product = () => {
    const productCategories = [
        {
            Fresh_Meat: [ {Aerobic_Plate_Count: 6.699, Yeast_And_Mold_Count: 4.699, Escherichia_Coil: 3, Staphylococcus_Aureus: 3, Salmonella: 0}],
            Frozen_Meat: [ {Aerobic_Plate_Count: 6.699, Yeast_And_Mold_Count: 4, Escherichia_Coil: 2, Staphylococcus_Aureus: 2, Salmonella: 0}],
            Raw_Marinated_Meat: [ {Aerobic_Plate_Count: 6.699, Yeast_And_Mold_Count: 4.699, Escherichia_Coil: 3, Staphylococcus_Aureus: 3, Salmonella: 0}],
            Semi_Cooked_Meat: [ {Aerobic_Plate_Count: 5, Yeast_And_Mold_Count: 2, Escherichia_Coil: 2, Staphylococcus_Aureus: 2, Salmonella: 0}],
            Pickled_Meat: [ {Aerobic_Plate_Count: 3.699, Yeast_And_Mold_Count: 3, Escherichia_Coil: 2, Staphylococcus_Aureus: 3, Salmonella: 0}],
            Fermented_Meat_Products: [ {Aerobic_Plate_Count: 'NA', Yeast_And_Mold_Count: 'NA', Escherichia_Coil: 2, Staphylococcus_Aureus: 3, Salmonella: 0}],
            Dried_Meat_Products: [ {Aerobic_Plate_Count: 4, Yeast_And_Mold_Count: 3, Escherichia_Coil: 2, Staphylococcus_Aureus: 2, Salmonella: 0}],
            Cooked_Meat_Products: [ {Aerobic_Plate_Count: 4, Yeast_And_Mold_Count: 2, Escherichia_Coil: 2, Staphylococcus_Aureus: 2, Salmonella: 0}],
            Canned_Meat_Products: [ {Aerobic_Plate_Count: 'NA', Yeast_And_Mold_Count: 'NA', Escherichia_Coil: 0, Staphylococcus_Aureus: 0, Salmonella: 0}],
        },
    ];
    const microbialST = ['Aerobic_Plate_Count', 'Yeast_And_Mold_Count', 'Escherichia_Coil', 'Staphylococcus_Aureus', 'Salmonella'];
    const [selectedMeat, setSelectedMeat] = React.useState('');
    const [selectedStandard, setSelectedStandard] = React.useState('');
    const [NAState, setNAState] = React.useState(false);
    const [threshold, setThreshold] = React.useState(0);
    const [nextStep, setNextStep] = React.useState('');
    const [lotNumber, setLotNumber] = React.useState('');
    const [batchNumber, setBatchNumber] = React.useState('');
    const [report, setReports] = React.useState([]);
    const handleMeatChange = (event) => {
        setSelectedMeat(event.target.value);
    };
    const handleStandardChange = (event) => {
        setSelectedStandard(event.target.value);
    };
    useEffect(() => {
        if (selectedMeat && selectedStandard) {
            const meatData = productCategories[0][selectedMeat];
            if (meatData && meatData.length > 0) {
                const data = meatData[0]
                const value = data[selectedStandard];
                setThreshold(value);
                console.log(value, 'value');
                if(value === 'NA') {
                    setNAState(true);
                }else{
                    setNAState(false);
                }
            }
        }
    }, [selectedMeat, selectedStandard]);
    const [sampleValues, setSampleValues] = React.useState({
        sample1: '',
        sample2: '',
        sample3: '',
        sample4: '',
        sample5: ''
    });
    const handleLotNumber = (event) => {
        setLotNumber(event.target.value);
    };
    const handleBatchChange = (event) => {
        setBatchNumber(event.target.value);
    };
    const handleSampleChange = (event) => {
        const { name, value } = event.target;
        setSampleValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };
    const isFormValid = () => {
        return selectedMeat && selectedStandard &&
        Object.values(sampleValues).every(value => value !== '');
    };
    const handleSubmit = () => {
        const sampleValuesArray = Object.values(sampleValues).map(Number);
        const allBelowThreshold = sampleValuesArray.every(value => value <= threshold);
        window.scrollTo(0,700);
        setNextStep('Please wait...')
        setTimeout(() => {
        if (allBelowThreshold) {
            setNextStep('Proceed');
        } else {
            setNextStep('Decline');
        }
    },2000)
        const reportData = {
            selectedMeat,
            selectedStandard,
            lotNumber,
            batchNumber,
            sampleValues
        };
        // Push the reportData to a new state (assuming you have a state to store reports)
        // For example, if you have a state called reports:
        setReports(prevReports => [...prevReports, reportData]);
        console.log(reportData, 'reportData');
        // Clear all input field state values
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'cursive' ,backgroundColor:'antiquewhite'}} >
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1 style={{ color: '#333' }}>Food Safety Assesment</h1>
                <div style={{ margin: '10px 0' }}>
                    <label>
                        Select Product:
                        <select style={{ margin: '10px 10px', padding: '10px', fontSize: '14px', width: '65%' }}
                            onChange={handleMeatChange}>
                            <option value="" disabled selected>Select meat type</option>
                            {Object.keys(productCategories[0]).map((category, index) => (
                                <option key={index} value={category}>{category.replace(/_/g, ' ')}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div style={{ margin: '10px 0', textAlign: 'left' }}>
                    <label style={{ display: 'block', margin: '10px 0' }}>
                        Enter Lot Number:
                        <input type="text" name="lotNumber" placeholder="Lot Number" style={{ margin: '5px 0', padding: '10px', width: '100%' }} onChange={handleLotNumber}/>
                    </label>
                    <label style={{ display: 'block', margin: '10px 0' }}>
                        Enter Batch Number:
                        <input type="text" name="batchNumber" placeholder="Batch Number" style={{ margin: '5px 0', padding: '10px', width: '100%' }} onChange={handleBatchChange}/>
                    </label>
                    <label style={{ display: 'block', margin: '10px 0' }}>
                        Enter Number of Sample Units:
                        <input type="number" name="sampleUnits" placeholder="Number of Sample Units" style={{ margin: '5px 0', padding: '10px', width: '100%' }} value={5} disabled/>
                    </label>
                </div>
                <div style={{ margin: '10px 0' }}>
                    <label>
                        Select Test:
                        <select style={{ margin: '10px 10px', padding: '10px', fontSize: '14px', width: '65%' }}
                            onChange={handleStandardChange}>
                            <option value="" disabled selected>Select standard</option>
                            {microbialST.map((category, index) => (
                                <option key={index} value={category}>{category.replace(/_/g, ' ')}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div style={{ margin: '10px 0' }}>
                    {NAState && <p style={{ color: 'red', fontWeight: 'bold' }}>This test is not applicable for the selected product</p>}
                </div>
                <div style={{ textAlign: 'left' }}>
                    <label style={{ display: 'block', margin: '10px 0' }}>
                        Enter Sample 1 value:
                        <input type="number" name="sample1" placeholder="Sample 1" style={{ margin: '5px 0', padding: '10px', width: '100%' }} onChange={handleSampleChange} />
                    </label>
                    <label style={{ display: 'block', margin: '10px 0' }}>
                        Enter Sample 2 value:
                        <input type="number" name="sample2" placeholder="Sample 2" style={{ margin: '5px 0', padding: '10px', width: '100%' }} onChange={handleSampleChange} />
                    </label>
                    <label style={{ display: 'block', margin: '10px 0' }}>
                        Enter Sample 3 value:
                        <input type="number" name="sample3" placeholder="Sample 3" style={{ margin: '5px 0', padding: '10px', width: '100%' }} onChange={handleSampleChange} />
                    </label>
                    <label style={{ display: 'block', margin: '10px 0' }}>
                        Enter Sample 4 value:
                        <input type="number" name="sample4" placeholder="Sample 4" style={{ margin: '5px 0', padding: '10px', width: '100%' }} onChange={handleSampleChange} />
                    </label>
                    <label style={{ display: 'block', margin: '10px 0' }}>
                        Enter Sample 5 value:
                        <input type="number" name="sample5" placeholder="Sample 5" style={{ margin: '5px 0', padding: '10px', width: '100%' }} onChange={handleSampleChange} />
                    </label>
                </div>
                <div style={{ textAlign: 'left' }}>
                    <button style={{ padding: '10px 20px'}} type='button' class="btn btn-success" disabled={!isFormValid()} onClick={handleSubmit}>Run Report</button>
                </div>
                
                    <div style={{ marginTop: '30px', paddingBottom:'30px' }} id='result_next'>
                        {nextStep &&
                        <h2 style={{ color: '#333' }}>Result: <span style={{ color: nextStep ==='Proceed' ? 'green' : 'red' }}>{nextStep}</span></h2>}
                    </div>
                
            </div>
        </div>
    );
};
export default Product;



