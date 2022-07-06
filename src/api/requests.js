import { gql } from "@apollo/client";

import { client } from "./apiClient";


export const getProduct = (id) => {
    const product = client
        .query({
            query: gql`query GetProduct{
                        product(id:"${id}") {
                            id
                            name
                            brand
                            description
                            gallery
                            attributes{
                              name
                              type
                              items{
                                displayValue
                                value
                              }
                            }
                            prices{
                                amount
                                currency{
                                symbol
                                }
                            }
                            
                            }
                        }
            `,
        })

    return product
}


export const getAllProducts = () => {

    const res = client
        .query({
            query: gql`
            query GetClothes{
            category(input: { title: "all" }) {
                products {
                id
                name
                brand
                gallery
                prices {
                    amount
                    currency{
                    symbol
                    }
                }
                attributes{
                  name
                  type
                  items{
                    value
                  }
                }
                }
            }
            }
        `,
        })

    return res

}
//category specific products
export const getProducts = (category) => {
    const products = client.query({
        query: gql`query GetProducts{
                category(input: { title: "${category}" }) {
                    name
                    products {
                    id
                    name
                    brand
                    gallery
                    prices {
                        amount
                        currency{
                        symbol
                        }
                    }
                    attributes{
                        name,
                        items{
                          value
                        }
                      }
                    }
                }
                }
            `,
    });

    return products
}