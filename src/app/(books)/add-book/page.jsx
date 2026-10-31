import AddBookForm from '@/components/books/AddBookForm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const AddBookPage = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user;

    if (!user) {
        redirect("/login")
    }
    return (
        <main>
            <AddBookForm user={user}></AddBookForm>        
        </main>
    );
};

export default AddBookPage;