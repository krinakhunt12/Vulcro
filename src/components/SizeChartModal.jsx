"use client";
import { useState } from "react";

export default function SizeChartModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="text-sm underline text-gray-700">Size Chart</button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />

          <div className="bg-white rounded-lg p-6 z-10 max-w-lg w-full shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Size Chart</h3>
            <table className="w-full text-sm text-gray-700 mb-4">
              <thead>
                <tr>
                  <th className="text-left">Size</th>
                  <th className="text-left">Bust (in)</th>
                  <th className="text-left">Length (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>S</td><td>34</td><td>38</td></tr>
                <tr><td>M</td><td>36</td><td>39</td></tr>
                <tr><td>L</td><td>38</td><td>40</td></tr>
                <tr><td>XL</td><td>40</td><td>41</td></tr>
              </tbody>
            </table>
            <div className="flex justify-end">
              <button onClick={() => setOpen(false)} className="px-4 py-2 border rounded-md">Close</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
