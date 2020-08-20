//@ts-nocheck
import React from 'react';
import useSWR from 'swr';

import { endpoint, fetcher } from 'services/fetcher';

const Swr: React.FC = () => {
  const { data: repositories, error } = useSWR(endpoint, fetcher);

  if (error) return `Something went wrong: ${error.message}`;
  if (!repositories) return <div>loading...</div>;

  return repositories.map((repository) => (
    <div key={repository.id}>{repository.name}</div>
  ));
};

export default Swr;
