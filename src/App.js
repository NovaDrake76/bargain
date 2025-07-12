import React, { useState, useEffect } from "react";

export default function CSFloatBargainCalculator() {
  const [skinPrice, setSkinPrice] = useState("");
  const [calculations, setCalculations] = useState([]);

  useEffect(() => {
    if (skinPrice && parseFloat(skinPrice) > 0) {
      const price = parseFloat(skinPrice);
      const profitTargets = [5, 10, 15, 20, 25, 30, 50, 75, 100];

      const newCalculations = profitTargets.map((profit) => {
        const maxBuyPrice = (price - profit) / 1.02;
        const percentageOfOriginal = (maxBuyPrice / price) * 100;

        return {
          profit,
          maxBuyPrice: maxBuyPrice > 0 ? maxBuyPrice : 0,
          percentageOfOriginal:
            percentageOfOriginal > 0 ? percentageOfOriginal : 0,
        };
      });

      setCalculations(newCalculations);
    } else {
      setCalculations([]);
    }
  }, [skinPrice]);

  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  const formatPercentage = (percentage) => {
    return percentage.toFixed(1);
  };

  const getRowColor = (percentage) => {
    if (percentage >= 85) return "bg-green-50 border-green-200";
    if (percentage >= 80) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  const getTextColor = (percentage) => {
    if (percentage >= 85) return "text-green-800";
    if (percentage >= 80) return "text-yellow-800";
    return "text-red-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Bargain Calculator
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Calculate optimal offer prices for skins
          </p>

          <div className="mb-8">
            <label
              htmlFor="skinPrice"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Current Skin Price ($)
            </label>
            <input
              type="number"
              id="skinPrice"
              value={skinPrice}
              onChange={(e) => setSkinPrice(e.target.value)}
              placeholder="Enter the current asking price..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              min="0"
              step="0.01"
            />
          </div>

          {calculations.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Bargain Recommendations
              </h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> These calculations include the 2%
                  selling fee. Green rows (85%+) have the highest chance of
                  acceptance.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Target Profit
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Max Offer Price
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        % of Original
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                        Acceptance Chance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculations.map((calc, index) => (
                      <tr
                        key={index}
                        className={`border ${getRowColor(
                          calc.percentageOfOriginal
                        )}`}
                      >
                        <td className="border border-gray-300 px-4 py-3 font-medium">
                          ${calc.profit}
                        </td>
                        <td
                          className={`border border-gray-300 px-4 py-3 font-bold text-lg ${getTextColor(
                            calc.percentageOfOriginal
                          )}`}
                        >
                          ${formatPrice(calc.maxBuyPrice)}
                        </td>
                        <td
                          className={`border border-gray-300 px-4 py-3 font-medium ${getTextColor(
                            calc.percentageOfOriginal
                          )}`}
                        >
                          {formatPercentage(calc.percentageOfOriginal)}%
                        </td>
                        <td className="border border-gray-300 px-4 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              calc.percentageOfOriginal >= 85
                                ? "bg-green-100 text-green-800"
                                : calc.percentageOfOriginal >= 80
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {calc.percentageOfOriginal >= 85
                              ? "High"
                              : calc.percentageOfOriginal >= 80
                              ? "Medium"
                              : "Low"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">
                  How it works:
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>
                    • The calculator accounts for the 2% selling fee when you
                    sell the skin
                  </li>
                  <li>
                    • Higher percentages (85%+) have better acceptance rates
                    from sellers
                  </li>
                  <li>
                    • Lower offers may be rejected but give you higher profit
                    margins
                  </li>
                  <li>
                    • Choose your offer based on your risk tolerance and profit
                    goals
                  </li>
                </ul>
              </div>
            </div>
          )}

          {skinPrice && parseFloat(skinPrice) <= 0 && (
            <div className="text-center py-8 text-gray-500">
              Please enter a valid skin price to see bargain recommendations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
