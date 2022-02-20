import { act, cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import Home from '../Home';
import axios from 'axios';

beforeEach(() => {
    document.body.innerHTML = "";
});

afterEach(() => {
    cleanup();
});

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));


describe("Random Button Test", () => {
    test("Random Button Enable", () => {
        const component = render(<Home />);
        const randomButton = component.getByRole('button', { name: /Random Search/i });
        expect(randomButton).toBeEnabled();
    })
    test("Random Button Disabled", async () => {
        await act(async () => {
            const component = render(<Home />);
            const randomButton = component.getByRole('button', { name: /Random Search/i });
            // const inputfield: any = component.getByTestId('inputfield').querySelector('input');
            await fireEvent.click(randomButton);
            expect(randomButton).toBeDisabled();
        })
    })
})

describe("Home Component Test", () => {

    test("Input Field Test", async () => {
        await act(async () => {
            const component = render(<Home />);
            const inputfield = component.getByTestId('inputfield');
            expect(inputfield).toBeTruthy();
        })
    })
    test("Search Button Test", () => {
        const component = render(<Home />);
        const searchButton = component.getByTestId('searchButton');
        expect(searchButton).toBeTruthy();
    })
    test("Random Button Test", () => {
        const component = render(<Home />);
        const randomButton = component.getByTestId('randomButton');
        expect(randomButton).toBeTruthy();
    })
    // test("Create SnapShot", () => {
    //     const tree = renderer.create(<Home />);
    //     expect(tree).toMatchSnapshot();
    // })

})

describe("Api Test When Astroid Id is not given", () => {
    
    // const mockData = { data: {} };
    // const getAstoridId = jest.fn((url) => {
    //     return mockData
    // });
    // test("Return all Astroid details", () => {
    //     expect(getAstoridId(mockUrl)).toBe(mockData);
    // })
    // test("Return Astroid url", () => {
    //     expect(getAstoridId).toBeCalledWith(mockUrl);
    // })
    test('API REsponse status test', async () => {
        jest.useFakeTimers()
        const response = await axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=wUyFxo6gsWNWArjWdwelzSDXcqRkYCajzdnYSkoF');
        setTimeout(() => {
            expect(response.status).toBe(200)
        }, 60000)
        jest.runAllTimers()
    })
})

describe("Api Test When Astroid Id is given", () => {
    const mockUrl = 'https://api.nasa.gov/neo/rest/v1/neo/2001943?api_key=wUyFxo6gsWNWArjWdwelzSDXcqRkYCajzdnYSkoF';
    const mockData = { data: {} };
    const getAstoridDetails = jest.fn((url) => {
        return mockData
    });
    test("Return Astroid Id details", () => {
        expect(getAstoridDetails(mockUrl)).toBe(mockData);
    })
    test("Return Astroid Id details url", () => {
        expect(getAstoridDetails).toBeCalledWith(mockUrl);
    })
})