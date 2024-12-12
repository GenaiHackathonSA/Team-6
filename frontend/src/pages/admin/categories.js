import AdminService from "../../services/adminService";
import Header from "../../components/utils/header";
import Loading from "../../components/utils/loading";
import useCategories from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import Info from "../../components/utils/Info";
import Container from "../../components/utils/Container";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast/headless";
import { useState } from "react";

function AdminCategoriesManagement() {

    const [data, isFetching] = useCategories([])
    const [categoryName, setCategoryName] = useState("");
    const [transactionTypeId, setTransactionTypeId] = useState(1);
    const [enabled, setEnabled] = useState(true);
    const [editingCategory, setEditingCategory] = useState(null);

    const disableOrEnable = async (categoryId) => {
        await AdminService.disableOrEnableCategory(categoryId).then(
            (response) => {
                if (response.data.status === 'SUCCESS') {
                    window.location.reload()
                }
            },
            (error) => {
                toast.error("Failed to update category: Try again later!")
            }
        )
    }

    // Highlighted changes start here
    const handleCreateOrUpdateCategory = async () => {
        if (editingCategory) {
            await AdminService.updateCategory(editingCategory.categoryId, categoryName, transactionTypeId, enabled).then(
                (response) => {
                    if (response.data.status === 'SUCCESS') {
                        window.location.reload()
                    }
                },
                (error) => {
                    toast.error("Failed to update category: Try again later!")
                }
            )
        } else {
            await AdminService.createCategory(categoryName, transactionTypeId, enabled).then(
                (response) => {
                    if (response.data.status === 'SUCCESS') {
                        window.location.reload()
                    }
                },
                (error) => {
                    toast.error("Failed to create category: Try again later!")
                }
            )
        }
    }

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setCategoryName(category.categoryName);
        setTransactionTypeId(category.transactionType.transactionTypeId);
        setEnabled(category.enabled);
    }
    // Highlighted changes end here

    return (
        <Container activeNavId={6}>
            <Header title="Categories" />
            <Toaster />
            {(isFetching) && <Loading />}
            {(!isFetching) && (data.length === 0) && <Info text={"No categories found!"} />}
            {(!isFetching) && (data.length !== 0) && (
                <>
                    <div>
                        <input
                            type="text"
                            placeholder="Category Name"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <select value={transactionTypeId} onChange={(e) => setTransactionTypeId(parseInt(e.target.value))}>
                            <option value={1}>Expense</option>
                            <option value={2}>Income</option>
                        </select>
                        <label>
                            <input
                                type="checkbox"
                                checked={enabled}
                                onChange={(e) => setEnabled(e.target.checked)}
                            />
                            Enabled
                        </label>
                        <button onClick={handleCreateOrUpdateCategory}>
                            {editingCategory ? "Update Category" : "Create Category"}
                        </button>
                    </div>
                    <table>
                        <CategoriesTableHeader />
                        <CategoriesTableBody data={data} disableOrEnable={disableOrEnable} handleEditCategory={handleEditCategory} />
                    </table>
                </>
            )}
        </Container>
    )
}

export default AdminCategoriesManagement;

function CategoriesTableHeader() {
    return (
        <tr>
            <th>Category Id</th>
            <th>Category Name</th>
            <th>Type</th>
            <th>Enabled</th>
            <th>Action</th>
        </tr>
    )
}

function CategoriesTableBody({ data, disableOrEnable, handleEditCategory }) {

    return (
        data.map((item) => {
            return (
                <tr key={item.categoryId}>

                    <td>{"C" + String(item.categoryId).padStart(5, '0')}</td>

                    <td>{item.categoryName}</td>

                    <td>{item.transactionType.transactionTypeName}</td>
                    {
                        item.enabled ? <td style={{ color: '#6aa412' }}>Enabled</td> : <td style={{ color: '#ff0000' }}>Disabled</td>
                    }

                    <td style={{ display: 'flex', gap: '5px' }}>
                        {
                            (item.enabled) ?
                                (<button
                                    onClick={() => disableOrEnable(item.categoryId)}
                                    style={{ backgroundColor: '#ff0000' }}
                                >
                                    Disable
                                </button>)
                                :
                                (<button
                                    onClick={() => disableOrEnable(item.categoryId)}
                                    style={{ backgroundColor: '#6aa412' }}
                                >
                                    Enable
                                </button>)
                        }
                        <button onClick={() => handleEditCategory(item)}>Edit</button>
                    </td>
                </tr>
            )
        })
    )
}
