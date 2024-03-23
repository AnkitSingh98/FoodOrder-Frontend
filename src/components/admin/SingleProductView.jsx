import { Button } from "react-bootstrap"

const SingleProductView = ({ index, product, deleteProduct, viewProduct, updateProduct}) =>{


    const getBackgroundForProduct = () =>{

        // live + stock ==> green
        // not live ==> red
        // else ==> yellow

        if(product.live && product.stock)
            return "table-success"
        else if(!product.live)
            return "table-danger"
        else
            return "table-warning"
    }

    return(
        <>
            <tr className={ getBackgroundForProduct() }>
                <td className="px-3 small">{index+1}</td>
                <td className="px-3 small">{product.productName}</td>
                <td className="px-3 small">{product.productQuantity}</td>
                <td className="px-3 small">₹{product.productPrice}</td>
                <td className="px-3 small">₹{product.productDiscountedPrice}</td>
                <td className="px-3 small">{product.live ? 'True' : 'False'}</td>
                <td className="px-3 small">{product.stock ? 'True' : 'False'}</td>
                <td className="px-3 small">{product.category ? product.category.title : ''}</td>
                <td className="px-3 small d-flex">
                    <Button onClick={ (event)=> deleteProduct(product.productId) } variant="danger" size="sm">Delete</Button>
                    <Button onClick={ (event)=> viewProduct(product) } className="ms-2" variant="info" size="sm">View</Button> 
                    <Button onClick={ (event)=> updateProduct(product) } className="ms-2" variant="dark" size="sm">Update</Button>
                 </td>
            </tr>           
        </>
    )
}

export default SingleProductView