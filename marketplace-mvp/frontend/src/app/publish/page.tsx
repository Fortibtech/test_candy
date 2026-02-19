import ProductForm from '../../components/ProductForm';

export default function PublishPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Déposer une annonce</h1>
            <ProductForm />
        </div>
    );
}
