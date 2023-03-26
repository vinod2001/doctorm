// @ts-nocheck
import React from "react";
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  Highlight, SearchBox
} from 'react-instantsearch-dom';
import Link from 'next/link';

const client = algoliasearch('YXKWT0FKQM', '11d7ffaf5f69d91c4b7945038aeaef79');

const searchClient = {
  ...client,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return [];
    }
    return client.search(requests);
  },
};

function Hit({ hit }: HitProps) {
  return (
    <>
      <Link target="_blank" href={"/en-US//products/" + hit.slug} passHref className="Hit-label">
        <img src={hit.thumbnail} width="100" height="50"></img>
        <Highlight hit={hit} attribute="name" />
      </Link>
      <span className="Hit-price">${hit.price}</span>
    </>
  );
}

export default function Search() {

  return (
    <div className="ais-InstantSearch">
      <InstantSearch indexName="saleor_test.default-channel.USD.products" searchClient={searchClient}>
        <div className="right-panel">
          <SearchBox showLoadingIndicator={false} defaultRefinement="" />
            <Hits hitComponent={Hit} />
        </div>
      </InstantSearch>
    </div>
  );
}