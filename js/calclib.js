const StockCalculator = {
    calculateProfitOrLoss: function (buyPrice, buyQuantity, sellPrice, sellQuantity, brockerage_percentage, pl_brokerage_type) {
        const totalCost = buyPrice * buyQuantity;
        const costOfSoldQty = buyPrice * sellQuantity;
        const revenueFromSoldQty = sellPrice * sellQuantity;
        
        let profitOrLoss = revenueFromSoldQty - costOfSoldQty;
        let brockerage_percentage_amt = pl_brokerage_type === 'percentage' 
            ? profitOrLoss * (brockerage_percentage / 100) 
            : brockerage_percentage;
        
        profitOrLoss -= brockerage_percentage_amt;
        
        let prof_status = profitOrLoss > 0 ? 'profit' : profitOrLoss < 0 ? 'loss' : 'npnl';
        
        const remainingQty = buyQuantity - sellQuantity;
        const remainingValue = remainingQty * buyPrice;
        const profitPercentage = (profitOrLoss / costOfSoldQty) * 100;
        
        return {
            profitOrLoss: profitOrLoss,
            remainingQty: remainingQty,
            remainingValue: remainingValue,
            totalBuyValue: totalCost,
            prof_status: prof_status,
            brockerage_percentage_amt: brockerage_percentage_amt,
            profitPercentage: profitPercentage.toFixed(2),
            costOfSoldQty: costOfSoldQty,
            revenueFromSoldQty: revenueFromSoldQty
        };
    }
};

export default StockCalculator;
