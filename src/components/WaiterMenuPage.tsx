import React, { useMemo, useState } from "react";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  available: boolean;
  category: string;
};

type MenuFormState = {
  name: string;
  price: string;
  category: string;
  available: boolean;
};

const initialItems: MenuItem[] = [
  {
    id: "item-1",
    name: "Taco al Pastor",
    price: 8.5,
    available: true,
    category: "Tacos",
  },
  {
    id: "item-2",
    name: "Grilled Corn Esquites",
    price: 6.0,
    available: true,
    category: "Sides",
  },
  {
    id: "item-3",
    name: "Mole Chicken Bowl",
    price: 12.0,
    available: false,
    category: "Bowls",
  },
];

const emptyFormState: MenuFormState = {
  name: "",
  price: "",
  category: "",
  available: true,
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(value);

export default function WaiterMenuPage() {
  const [items, setItems] = useState<MenuItem[]>(initialItems);
  const [formState, setFormState] = useState<MenuFormState>(emptyFormState);
  const [editingId, setEditingId] = useState<string | null>(null);

  const isEditing = useMemo(() => editingId !== null, [editingId]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      const input = event.target as HTMLInputElement;
      setFormState((prev) => ({ ...prev, [name]: input.checked }));
      return;
    }
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.name.trim() || !formState.price.trim()) {
      return;
    }

    const parsedPrice = Number(formState.price);
    if (Number.isNaN(parsedPrice)) {
      return;
    }

    if (isEditing && editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: formState.name.trim(),
                price: parsedPrice,
                category: formState.category.trim() || "Uncategorized",
                available: formState.available,
              }
            : item
        )
      );
    } else {
      const newItem: MenuItem = {
        id: `item-${Date.now()}`,
        name: formState.name.trim(),
        price: parsedPrice,
        category: formState.category.trim() || "Uncategorized",
        available: formState.available,
      };
      setItems((prev) => [newItem, ...prev]);
    }

    setFormState(emptyFormState);
    setEditingId(null);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setFormState({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      available: item.available,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormState(emptyFormState);
  };

  const handleToggleAvailability = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  const handleReorder = (index: number, direction: "up" | "down") => {
    setItems((prev) => {
      const updated = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= updated.length) {
        return prev;
      }
      [updated[index], updated[targetIndex]] = [
        updated[targetIndex],
        updated[index],
      ];
      return updated;
    });
  };

  return (
    <div className="d-flex bg-light min-vh-100">
      <aside className="border-end bg-white p-4 waiter-sidebar">
        <div className="d-flex align-items-center gap-2 mb-4">
          <div className="bg-danger rounded-circle waiter-logo" />
          <div>
            <h5 className="mb-0">Oaxaca ARMS</h5>
            <small className="text-muted">Waiter Console</small>
          </div>
        </div>
        <nav className="nav flex-column gap-2">
          <button className="btn btn-danger text-start">Menu</button>
          <button className="btn btn-outline-secondary text-start">
            Tables
          </button>
          <button className="btn btn-outline-secondary text-start">
            Active Orders
          </button>
          <button className="btn btn-outline-secondary text-start">Billing</button>
          <button className="btn btn-outline-secondary text-start">
            Reports
          </button>
        </nav>
        <div className="mt-4">
          <div className="small text-muted">Shift status</div>
          <div className="fw-semibold">On floor • 12 tables</div>
        </div>
      </aside>

      <main className="flex-grow-1 p-4 p-lg-5">
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-4">
          <div>
            <h2 className="mb-1">Menu management</h2>
            <p className="text-muted mb-0">
              Update menu items, pricing, and availability in real time.
            </p>
          </div>
          <div className="bg-white rounded-4 shadow-sm px-3 py-2">
            <div className="small text-muted">Today&apos;s service</div>
            <div className="fw-semibold">Lunch • 11:00 - 15:30</div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-xl-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">
                  {isEditing ? "Edit item" : "Add new item"}
                </h5>
                <form onSubmit={handleSubmit} className="d-grid gap-3">
                  <div>
                    <label className="form-label">Item name</label>
                    <input
                      name="name"
                      className="form-control"
                      placeholder="e.g. Spicy shrimp taco"
                      value={formState.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="form-label">Price (GBP)</label>
                    <input
                      name="price"
                      className="form-control"
                      placeholder="e.g. 9.50"
                      value={formState.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="form-label">Category</label>
                    <input
                      name="category"
                      className="form-control"
                      placeholder="e.g. Tacos"
                      value={formState.category}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-check form-switch">
                    <input
                      id="availabilitySwitch"
                      name="available"
                      type="checkbox"
                      className="form-check-input"
                      checked={formState.available}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="availabilitySwitch">
                      Available on menu
                    </label>
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-danger flex-grow-1">
                      {isEditing ? "Save changes" : "Add item"}
                    </button>
                    {isEditing ? (
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </form>
                <div className="mt-4">
                  <div className="small text-muted">Quick tips</div>
                  <ul className="small text-muted ps-3 mb-0">
                    <li>Use the toggle to mark items temporarily unavailable.</li>
                    <li>Drag-and-drop is coming soon; use arrows for now.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
                  <div>
                    <h5 className="card-title mb-1">Current menu</h5>
                    <p className="text-muted mb-0">
                      {items.length} items • Updated instantly
                    </p>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-secondary btn-sm">
                      Filter
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      Export
                    </button>
                  </div>
                </div>

                <div className="d-grid gap-3">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="border rounded-4 p-3 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3"
                    >
                      <div>
                        <div className="d-flex align-items-center gap-2">
                          <h6 className="mb-0">{item.name}</h6>
                          <span className="badge text-bg-light">
                            {item.category}
                          </span>
                        </div>
                        <div className="text-muted small">
                          {formatCurrency(item.price)}
                        </div>
                      </div>
                      <div className="d-flex flex-wrap align-items-center gap-2">
                        <button
                          className={`btn btn-sm ${
                            item.available
                              ? "btn-outline-success"
                              : "btn-outline-danger"
                          }`}
                          onClick={() => handleToggleAvailability(item.id)}
                        >
                          {item.available ? "Available" : "Unavailable"}
                        </button>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleReorder(index, "up")}
                            disabled={index === 0}
                          >
                            ↑
                          </button>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleReorder(index, "down")}
                            disabled={index === items.length - 1}
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
