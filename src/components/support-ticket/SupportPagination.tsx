"use client";
import FlexBox from "@component/FlexBox";
import Pagination from "@component/pagination";
import Ticket from "@models/Ticket.model";

const SupportPagination = ({ ticketList }: { ticketList: any[] }) => {
  return (
    <FlexBox justifyContent="center" mt="2.5rem">
      <Pagination
        onChange={(data) => console.log(data)}
        pageCount={Math.ceil(ticketList.length / 10)}
      />
    </FlexBox>
  );
};

export default SupportPagination;
