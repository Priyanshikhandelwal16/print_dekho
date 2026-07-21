"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Tag, Layers, X, FolderPlus, Upload, Loader2, Filter } from "lucide-react";
import Image from "next/image";

interface ProductsManagerProps {
  data: any;
  onSave: (newData: any) => void;
}

const CATEGORY_MAP: Record<string, { slug: string; subcategories: string[] }> = {
  "Corporate Gift Kits": {
    slug: "corporate-gift-kits",
    subcategories: ["Welcome Kits", "Onboarding Kits", "Festival Hampers", "Award Kits", "Executive Kits"],
  },
  "Employee Welcome Kits": {
    slug: "welcome-kits",
    subcategories: ["Joining Kits", "Swag Boxes", "Onboarding Hampers"],
  },
  "Bags & Backpacks": {
    slug: "bags",
    subcategories: ["Laptop Bags", "Tote Bags", "Backpacks", "Duffle Bags", "Laptop Sleeves"],
  },
  "Drinkware & Bottles": {
    slug: "drinkware",
    subcategories: ["Mugs", "Bottles", "Tumblers", "Sippers", "Flasks"],
  },
  "Corporate Apparel": {
    slug: "apparel",
    subcategories: ["Polo T-Shirts", "Round Neck", "Collar Shirts", "Jerseys", "Uniforms"],
  },
  "Sports Jerseys": {
    slug: "sports-jerseys",
    subcategories: ["Cricket Jerseys", "Soccer Jerseys", "Marathon Runner Tees", "Dry-Fit Athletic Tees"],
  },
  "Stationery & Diaries": {
    slug: "stationery",
    subcategories: ["Diaries", "Notebooks", "Pens", "Desk Accessories"],
  },
  "Promotional T-Shirts": {
    slug: "promotional",
    subcategories: ["Event Tees", "Campaign Wear", "Advertising Shirts"],
  },
  "Combo Sets": {
    slug: "combo-sets",
    subcategories: ["Bottle & Mug Combos", "Executive Gift Sets", "Luxury Hampers"],
  },
  "Festival Hampers": {
    slug: "festival-hampers",
    subcategories: ["Diwali Hampers", "New Year Kits", "Holiday Boxes"],
  },
  "Accessories": {
    slug: "accessories",
    subcategories: ["Keychains", "Tech Accessories", "ID Card Holders", "Badges"],
  },
  "Branding Solutions": {
    slug: "branding",
    subcategories: ["Logo Printing", "Embroidery", "Sublimation", "Laser Engraving"],
  },
};

export function ProductsManager({ data, onSave }: ProductsManagerProps) {
  const [categories, setCategories] = useState(data.categories || []);
  const [products, setProducts] = useState(data.products || []);
  const [activeSubTab, setActiveSubTab] = useState<"products" | "categories">("products");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
  const [selectedSubcategoryFilter, setSelectedSubcategoryFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  // Category Modal Form
  const [showCatModal, setShowCatModal] = useState(false);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [catForm, setCatForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    count: "",
    span: "lg:col-span-1",
  });

  // Product Modal Form
  const [showProdModal, setShowProdModal] = useState(false);
  const [editingProdId, setEditingProdId] = useState<string | null>(null);
  const [prodForm, setProdForm] = useState({
    name: "",
    category: "Corporate Gift Kits",
    categorySlug: "corporate-gift-kits",
    subcategory: "Welcome Kits",
    image: "",
  });

  // Upload image to /api/upload
  const handleImageFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (url: string) => void
  ) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onSuccess(data.url);
      } else {
        alert(data.message || "Failed to upload image");
      }
    } catch (err) {
      alert("Error uploading image file");
    } finally {
      setUploading(false);
    }
  };

  // Save changes back to database
  const saveAll = (updatedCategories: any[], updatedProducts: any[]) => {
    setCategories(updatedCategories);
    setProducts(updatedProducts);
    onSave({ categories: updatedCategories, products: updatedProducts });
  };

  // CATEGORIES METHODS
  const handleOpenCatModal = (cat: any = null) => {
    if (cat) {
      setEditingCatId(cat.id);
      setCatForm({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: cat.image,
        count: cat.count,
        span: cat.span || "lg:col-span-1",
      });
    } else {
      setEditingCatId(null);
      setCatForm({
        name: "",
        slug: "",
        description: "",
        image: "",
        count: "",
        span: "lg:col-span-1",
      });
    }
    setShowCatModal(true);
  };

  const handleSaveCat = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedCats = [...categories];

    if (editingCatId) {
      updatedCats = updatedCats.map((c) =>
        c.id === editingCatId ? { ...c, ...catForm } : c
      );
    } else {
      updatedCats.push({
        id: `cat-${Date.now()}`,
        ...catForm,
      });
    }

    saveAll(updatedCats, products);
    setShowCatModal(false);
  };

  const handleDeleteCat = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      const updatedCats = categories.filter((c: any) => c.id !== id);
      saveAll(updatedCats, products);
    }
  };

  // PRODUCTS METHODS
  const handleOpenProdModal = (prod: any = null) => {
    if (prod) {
      setEditingProdId(prod.id);
      setProdForm({
        name: prod.name,
        category: prod.category || "Corporate Gift Kits",
        categorySlug: prod.categorySlug || "corporate-gift-kits",
        subcategory: prod.subcategory || "Welcome Kits",
        image: prod.image || "",
      });
    } else {
      setEditingProdId(null);
      const defaultCat = Object.keys(CATEGORY_MAP)[0];
      setProdForm({
        name: "",
        category: defaultCat,
        categorySlug: CATEGORY_MAP[defaultCat].slug,
        subcategory: CATEGORY_MAP[defaultCat].subcategories[0] || "",
        image: "",
      });
    }
    setShowProdModal(true);
  };

  const handleCategoryChangeInForm = (catName: string) => {
    const mapInfo = CATEGORY_MAP[catName] || {
      slug: catName.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      subcategories: ["General"],
    };
    setProdForm({
      ...prodForm,
      category: catName,
      categorySlug: mapInfo.slug,
      subcategory: mapInfo.subcategories[0] || "",
    });
  };

  const handleSaveProd = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedProds = [...products];

    if (editingProdId) {
      updatedProds = updatedProds.map((p) =>
        p.id === editingProdId ? { ...p, ...prodForm } : p
      );
    } else {
      updatedProds.push({
        id: `prod-${Date.now()}`,
        ...prodForm,
      });
    }

    saveAll(categories, updatedProds);
    setShowProdModal(false);
  };

  const handleDeleteProd = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updatedProds = products.filter((p: any) => p.id !== id);
      saveAll(categories, updatedProds);
    }
  };

  const handleSelectCategoryFilter = (catName: string) => {
    setSelectedCategoryFilter(catName);
    setSelectedSubcategoryFilter("All");
  };

  // Filtered products list
  const filteredProducts = products.filter((p: any) => {
    const catMatch =
      selectedCategoryFilter === "All" ||
      p.category === selectedCategoryFilter ||
      p.categorySlug === selectedCategoryFilter ||
      (CATEGORY_MAP[selectedCategoryFilter] && p.categorySlug === CATEGORY_MAP[selectedCategoryFilter].slug);

    const subcatMatch =
      selectedCategoryFilter === "All" ||
      selectedSubcategoryFilter === "All" ||
      p.subcategory === selectedSubcategoryFilter;

    const searchMatch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()));

    return catMatch && subcatMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-heading font-extrabold text-xl text-secondary">Products & Categories</h2>
          <p className="text-muted text-xs mt-1">Upload and manage all products across main categories & subcategories.</p>
        </div>

        {/* Action Button */}
        {activeSubTab === "products" ? (
          <button
            onClick={() => handleOpenProdModal()}
            className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
          >
            <Plus size={14} /> Add Product
          </button>
        ) : (
          <button
            onClick={() => handleOpenCatModal()}
            className="flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-colors"
          >
            <FolderPlus size={14} /> Add Category
          </button>
        )}
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 border-b border-border/80 pb-3">
        <button
          onClick={() => setActiveSubTab("products")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === "products"
              ? "bg-secondary text-white shadow-sm"
              : "text-muted hover:bg-stone hover:text-secondary"
          }`}
        >
          <Layers size={14} /> Products ({products.length})
        </button>
        <button
          onClick={() => setActiveSubTab("categories")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activeSubTab === "categories"
              ? "bg-secondary text-white shadow-sm"
              : "text-muted hover:bg-stone hover:text-secondary"
          }`}
        >
          <Tag size={14} /> Categories ({categories.length})
        </button>
      </div>

      {/* Products Subtab Content */}
      {activeSubTab === "products" && (
        <div className="space-y-4">
          {/* Main Category Filter Pills + Search */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-grow">
                <span className="text-[11px] font-bold text-muted flex items-center gap-1 flex-shrink-0 mr-1">
                  <Filter size={12} /> Category:
                </span>
                <button
                  onClick={() => handleSelectCategoryFilter("All")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                    selectedCategoryFilter === "All"
                      ? "bg-accent text-white shadow-xs"
                      : "bg-white text-muted border border-border hover:bg-stone"
                  }`}
                >
                  All Products ({products.length})
                </button>
                {Object.keys(CATEGORY_MAP).map((catName) => {
                  const count = products.filter(
                    (p: any) =>
                      p.category === catName ||
                      p.categorySlug === CATEGORY_MAP[catName].slug
                  ).length;
                  return (
                    <button
                      key={catName}
                      onClick={() => handleSelectCategoryFilter(catName)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                        selectedCategoryFilter === catName
                          ? "bg-accent text-white shadow-xs"
                          : "bg-white text-muted border border-border hover:bg-stone"
                      }`}
                    >
                      {catName} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="w-full sm:w-64 flex-shrink-0">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-1.5 bg-white border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40 shadow-2xs"
                />
              </div>
            </div>

            {/* Subcategory Filter Pills (when category selected) */}
            {selectedCategoryFilter !== "All" && CATEGORY_MAP[selectedCategoryFilter] && (
              <div className="flex items-center gap-2 overflow-x-auto p-2 bg-stone/60 rounded-xl border border-border/50 scrollbar-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted flex-shrink-0 mr-1 pl-1">
                  Subcategory:
                </span>
                <button
                  onClick={() => setSelectedSubcategoryFilter("All")}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all flex-shrink-0 cursor-pointer ${
                    selectedSubcategoryFilter === "All"
                      ? "bg-secondary text-white"
                      : "bg-white text-muted border border-border/80 hover:bg-stone"
                  }`}
                >
                  All Subcategories
                </button>
                {CATEGORY_MAP[selectedCategoryFilter].subcategories.map((subcat) => {
                  const subCount = products.filter(
                    (p: any) =>
                      (p.category === selectedCategoryFilter || p.categorySlug === CATEGORY_MAP[selectedCategoryFilter].slug) &&
                      p.subcategory === subcat
                  ).length;
                  return (
                    <button
                      key={subcat}
                      onClick={() => setSelectedSubcategoryFilter(subcat)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all flex-shrink-0 cursor-pointer ${
                        selectedSubcategoryFilter === subcat
                          ? "bg-secondary text-white"
                          : "bg-white text-muted border border-border/80 hover:bg-stone"
                      }`}
                    >
                      {subcat} ({subCount})
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product: any) => (
              <div
                key={product.id}
                className="bg-white rounded-[22px] border border-border shadow-sm overflow-hidden group hover:border-accent/15 transition-all flex flex-col justify-between"
              >
                <div className="relative h-48 bg-stone/40 overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-103 transition-transform duration-500"
                      sizes="20vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-muted">
                      No image set
                    </div>
                  )}
                  {/* Actions overlay */}
                  <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleOpenProdModal(product)}
                      className="p-2 bg-white/95 text-secondary hover:text-accent rounded-lg shadow-sm cursor-pointer transition-colors"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteProd(product.id)}
                      className="p-2 bg-white/95 text-red-600 hover:bg-red-50 rounded-lg shadow-sm cursor-pointer transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  {product.subcategory && (
                    <div className="absolute bottom-2 left-2 bg-secondary/80 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                      {product.subcategory}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-[9px] font-bold text-accent/90 tracking-widest uppercase">
                    {product.category || product.categorySlug}
                  </span>
                  <h4 className="font-heading font-bold text-xs text-secondary mt-0.5 line-clamp-1">
                    {product.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Subtab Content */}
      {activeSubTab === "categories" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat: any) => (
            <div
              key={cat.id}
              className="flex gap-4 bg-white p-5 rounded-[22px] border border-border shadow-sm hover:border-accent/15 transition-all"
            >
              <div className="relative w-24 h-24 rounded-xl bg-stone/40 overflow-hidden flex-shrink-0">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="10vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] text-muted">
                    No image
                  </div>
                )}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-heading font-bold text-sm text-secondary truncate">{cat.name}</h4>
                    <span className="text-[10px] bg-stone px-2 py-0.5 rounded-md font-semibold text-muted">
                      /{cat.slug} • {cat.count}
                    </span>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleOpenCatModal(cat)}
                      className="p-1.5 bg-stone/50 hover:bg-accent/5 text-muted hover:text-accent rounded-lg cursor-pointer transition-colors"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteCat(cat.id)}
                      className="p-1.5 bg-stone/50 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-lg cursor-pointer transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-2 text-[10px] text-muted font-mono bg-stone/30 px-2 py-1 rounded inline-block">
                  Layout: {cat.span}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Modal Dialog */}
      {showCatModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[24px] border border-border shadow-2xl w-full max-w-[500px] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-border/80 pb-3">
              <h3 className="font-heading font-bold text-sm text-secondary">
                {editingCatId ? "Edit Category" : "Add New Category"}
              </h3>
              <button onClick={() => setShowCatModal(false)} className="text-muted hover:text-secondary cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveCat} className="space-y-4 mt-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Category Name</label>
                <input
                  type="text"
                  required
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  placeholder="e.g. Luxury Writing Sets"
                  className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Slug (URL path)</label>
                  <input
                    type="text"
                    required
                    value={catForm.slug}
                    onChange={(e) => setCatForm({ ...catForm, slug: e.target.value })}
                    placeholder="e.g. luxury-writing"
                    className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Quantity / Counter label</label>
                  <input
                    type="text"
                    required
                    value={catForm.count}
                    onChange={(e) => setCatForm({ ...catForm, count: e.target.value })}
                    placeholder="e.g. 50+ Products"
                    className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Description</label>
                <textarea
                  required
                  rows={3}
                  value={catForm.description}
                  onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                  placeholder="Provide details about products included in this category..."
                  className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40 resize-none"
                />
              </div>

              {/* Direct Image File Upload Section */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Category Image</label>
                <div className="flex flex-col gap-2">
                  {catForm.image && (
                    <div className="relative h-28 w-full bg-stone/40 rounded-xl overflow-hidden border border-border">
                      <Image src={catForm.image} alt="Preview" fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => setCatForm({ ...catForm, image: "" })}
                        className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 px-4 py-2 bg-stone hover:bg-accent/10 border border-border hover:border-accent/30 rounded-xl text-xs font-bold text-secondary cursor-pointer transition-all flex-grow justify-center">
                      {uploading ? <Loader2 size={14} className="animate-spin text-accent" /> : <Upload size={14} className="text-accent" />}
                      <span>{uploading ? "Uploading Image..." : "Upload Image File"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploading}
                        onChange={(e) => handleImageFileChange(e, (url) => setCatForm({ ...catForm, image: url }))}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={catForm.image}
                    onChange={(e) => setCatForm({ ...catForm, image: e.target.value })}
                    placeholder="Or enter image URL / path manually"
                    className="w-full px-3 py-2 bg-stone border border-border rounded-xl text-[11px] font-mono text-secondary focus:outline-none focus:border-accent/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Grid Layout Columns (Tailwind)</label>
                <select
                  value={catForm.span}
                  onChange={(e) => setCatForm({ ...catForm, span: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                >
                  <option value="lg:col-span-1">Single Column (1x Width)</option>
                  <option value="lg:col-span-2">Double Column (2x Width - Large cards)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 border-t border-border/80 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setShowCatModal(false)}
                  className="px-4 py-2 border border-border rounded-lg text-xs font-bold text-muted hover:bg-stone cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-secondary text-white rounded-lg text-xs font-bold hover:bg-secondary/90 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Modal Dialog */}
      {showProdModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[24px] border border-border shadow-2xl w-full max-w-[500px] p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-border/80 pb-3">
              <h3 className="font-heading font-bold text-sm text-secondary">
                {editingProdId ? "Edit Product" : "Add New Product"}
              </h3>
              <button onClick={() => setShowProdModal(false)} className="text-muted hover:text-secondary cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSaveProd} className="space-y-4 mt-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Product Title</label>
                <input
                  type="text"
                  required
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  placeholder="e.g. Matte Black Double Wall Flask"
                  className="w-full px-3.5 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                />
              </div>

              {/* Main Category Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Main Category</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => handleCategoryChangeInForm(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                  >
                    {Object.keys(CATEGORY_MAP).map((catName) => (
                      <option key={catName} value={catName}>
                        {catName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Subcategory / Tag</label>
                  <select
                    value={prodForm.subcategory}
                    onChange={(e) => setProdForm({ ...prodForm, subcategory: e.target.value })}
                    className="w-full px-3 py-2.5 bg-stone border border-border rounded-xl text-xs text-secondary focus:outline-none focus:border-accent/40"
                  >
                    {(CATEGORY_MAP[prodForm.category]?.subcategories || ["General"]).map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Direct Product Image Upload */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-muted mb-1.5">Product Image</label>
                <div className="flex flex-col gap-2">
                  {prodForm.image && (
                    <div className="relative h-36 w-full bg-stone/40 rounded-xl overflow-hidden border border-border">
                      <Image src={prodForm.image} alt="Preview" fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => setProdForm({ ...prodForm, image: "" })}
                        className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 px-4 py-2.5 bg-accent/5 hover:bg-accent/15 border border-accent/20 rounded-xl text-xs font-bold text-accent cursor-pointer transition-all flex-grow justify-center">
                      {uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
                      <span>{uploading ? "Uploading Image..." : "Upload Image File"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploading}
                        onChange={(e) => handleImageFileChange(e, (url) => setProdForm({ ...prodForm, image: url }))}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={prodForm.image}
                    onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                    placeholder="Or enter image URL / path manually"
                    className="w-full px-3 py-2 bg-stone border border-border rounded-xl text-[11px] font-mono text-secondary focus:outline-none focus:border-accent/40"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-border/80 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setShowProdModal(false)}
                  className="px-4 py-2 border border-border rounded-lg text-xs font-bold text-muted hover:bg-stone cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-secondary text-white rounded-lg text-xs font-bold hover:bg-secondary/90 cursor-pointer shadow-sm disabled:opacity-50"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
