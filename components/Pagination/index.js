import {useEffect, useState, useCallback} from 'react';
import {
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@chakra-ui/icons';

const sizeOptions = [10, 50, 100, 150, 200];

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalCount,
  hasPrevious,
  hasNext,
  onChangePage,
  onSetPageSize,
}) => {
  const [_currentPage, _setCurrentPage] = useState();
  const [_pageSize, _setPageSize] = useState();
  const handleChangePage = useCallback(
    (page) => {
      _setCurrentPage(page);
      onChangePage(page);
    },
    [onChangePage],
  );
  const handleOnSetPageSize = useCallback(
    (pS) => {
      _setPageSize(pS);
      onSetPageSize(pS);
    },
    [onSetPageSize],
  );
  useEffect(() => {
    _setCurrentPage(currentPage);
  }, [currentPage]);
  useEffect(() => {
    _setPageSize(pageSize);
  }, [pageSize]);
  return (
    <Flex justify="space-between" m={4} alignItems="center">
      <Flex>
        <Tooltip label="First Page">
          <IconButton
            onClick={() => handleChangePage(1)}
            isDisabled={!hasPrevious}
            icon={<ArrowLeftIcon h={3} w={3} />}
            mr={4}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            onClick={() => handleChangePage(_currentPage - 1)}
            isDisabled={!hasPrevious}
            icon={<ChevronLeftIcon h={6} w={6} />}
          />
        </Tooltip>
      </Flex>

      <Flex alignItems="center">
        <Text flexShrink="0" mr={8}>
          Page{' '}
          <Text fontWeight="bold" as="span">
            {_currentPage}
          </Text>{' '}
          of{' '}
          <Text fontWeight="bold" as="span">
            {totalPages}
          </Text>
        </Text>
        <Text flexShrink="0">Go to page:</Text>{' '}
        <NumberInput
          ml={2}
          mr={8}
          w={28}
          min={1}
          value={_currentPage}
          max={totalPages}
          onChange={(value) => handleChangePage(value)}
          defaultValue={_currentPage}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Select
          w={32}
          value={_pageSize}
          onChange={(e) => handleOnSetPageSize(Number(e.target.value))}>
          {sizeOptions.map((p) => (
            <option key={p} value={p}>
              Show {p}
            </option>
          ))}
        </Select>
      </Flex>

      <Flex>
        <Tooltip label="Next Page">
          <IconButton
            onClick={() => handleChangePage(_currentPage + 1)}
            isDisabled={!hasNext}
            icon={<ChevronRightIcon h={6} w={6} />}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            onClick={() => handleChangePage(totalCount)}
            isDisabled={!hasNext}
            icon={<ArrowRightIcon h={3} w={3} />}
            ml={4}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Pagination;
