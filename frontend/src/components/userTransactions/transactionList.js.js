import '../../assets/styles/transactionList.css'
import { Link } from 'react-router-dom';

function TransactionList() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await UserService.getTransactions(AuthService.getCurrentUser().email);
            setTransactions(response.data.response);
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Transactions</h2>
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction.id}>
                        {transaction.description} - {transaction.amount} {transaction.currency} (Converted: {transaction.convertedAmount} USD)
                    </li>
                ))}
            </ul>
        </div>
    );
}

function formatDate(dateString) {
    if (["Today", "Yesterday"].includes(dateString)) {
        return dateString
    }
    const date = new Date(dateString)
    const y = date.getFullYear()
    const m = date.toLocaleDateString('en-US', { month: 'long' })
    const d = date.getDate()
    return d + " " + m + " " + y;
}
export default TransactionList;
