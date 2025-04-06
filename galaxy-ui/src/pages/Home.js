import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHosts } from '../store/slice/hostSlice';
import HostTable from '../components/HostTable';

const Home = () => {
  const dispatch = useDispatch();
  const hosts = useSelector((state) => state.hosts.hostDetails || []);

  const [selectedTab, setSelectedTab] = useState("NDC");

  useEffect(() => {
    dispatch(setHosts());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <HostTable />
  );
};

export default Home;