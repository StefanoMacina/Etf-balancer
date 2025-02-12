/**
 * Singleton service to manage portfolio data, including PAC value, increment, and ETFs.
 */
export class PortofolioService {
    
    constructor(){
        if(!PortofolioService.instance){
            PortofolioService.instance = this;
            this.portfolioData = {
                pacValue: "",
                increment: "",
                etfs: []
            };
            this.loadFromStorage();
        }
        return PortofolioService.instance;
    }

    /**
     * Loads portfolio data from local storage if available.
     * If no data is found, initializes with default values.
     */
    loadFromStorage(){
        const data = localStorage.getItem("portfolioData");
        if(data){
            this.portfolioData = JSON.parse(data);
        }
    }

    /**
     * Saves PAC value and increment data to the portfolio.
     * Updates the local storage with the new data.
     * 
     * @param {Object} data - The data object containing pacValue and increment.
     * @param {string|number} data.pacValue - The PAC value.
     * @param {string|number} data.increment - The increment value.
     */
    updatePortfolio({pacValue, increment}){
        this.portfolioData.pacValue = pacValue;
        this.portfolioData.increment = increment;
        localStorage.setItem("portfolioData", JSON.stringify(this.portfolioData));
    }

    /**
     * Adds a new ETF to the portfolio and updates local storage.
     * 
     * @param {Object} data - The ETF data.
     * @param {string} data.name - The name of the ETF.
     * @param {number} data.target - The target allocation for the ETF.
     * @param {number} data.current - The current allocation of the ETF.
     */
    addETF({name, target, current}){
        const newETF = {
            id: Date.now(),
            name: name,
            target: target,
            current: current 
        };
        this.portfolioData.etfs.push(newETF);
        localStorage.setItem("portfolioData", JSON.stringify(this.portfolioData));
    }

    removeETF(name){
        this.portfolioData.etfs = this.portfolioData.etfs.filter(etf => etf.name !== name);
        localStorage.setItem("portfolioData", JSON.stringify(this.portfolioData));
    }

    getETFByName(name) {
        return this.portfolioData.etfs.find(etf => etf.name === name);
    }

    updateETF(originalName, {name, target, current}) {
        const index = this.portfolioData.etfs.findIndex(etf => etf.name === originalName);
        if (index !== -1) {
            this.portfolioData.etfs[index] = {
                ...this.portfolioData.etfs[index],
                name,
                target,
                current
            };
            localStorage.setItem("portfolioData", JSON.stringify(this.portfolioData));
        }
    }

    /**
     * Retrieves the current portfolio data.
     * 
     * @returns {Object} The portfolio data including PAC value, increment, and ETFs.
     */
    getPortfolioData() {
        return this.portfolioData;
    }
}

PortofolioService.instance = null;
