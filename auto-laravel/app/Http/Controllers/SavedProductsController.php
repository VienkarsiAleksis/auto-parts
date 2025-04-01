<?php

namespace App\Http\Controllers;

use App\Models\SavedProduct;
use Illuminate\Http\Request;

class SavedProductsController extends Controller
{
    public function getSavedProducts(Request $request)
    {
        // Fetch saved products for the user_id passed in the request
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $savedProducts = SavedProduct::where('user_id', $request->user_id)->get();
        return response()->json(['savedProducts' => $savedProducts]);
    }

    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'picture_url' => 'required|string',
            'title' => 'required|string',
            'website' => 'required|string',
            'price' => 'required|numeric',
            'link' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        // Create a new saved product
        SavedProduct::create([
            'picture_url' => $request->picture_url,
            'title' => $request->title,
            'website' => $request->website,
            'price' => $request->price,
            'link' => $request->link,
            'user_id' => $request->user_id,
        ]);

        return response()->json(['message' => 'Product saved successfully.']);
    }

    public function destroy(SavedProduct $savedProduct)
    {
        // Delete the saved product
        $savedProduct->delete();
        return response()->json(['message' => 'Product removed successfully.']);
    }

    public function deleteSelected(Request $request)
    {
        // Validate the request
        $request->validate([
            'productIds' => 'required|array',
            'productIds.*' => 'exists:saved_products,id',
        ]);

        // Delete the selected products
        SavedProduct::whereIn('id', $request->productIds)->delete();

        return response()->json(['message' => 'Selected products deleted successfully.']);
    }
}