import {useEffect, useState, useCallback} from 'react';
import {Stack, Select} from '@chakra-ui/react';
import Button from '../Button';

const SelectCompetitions = ({competitions, valueDefault, onAddLeague}) => {
  const [valueSelected, setValueSelected] = useState();
  const [error, setError] = useState(false);
  useEffect(() => {
    setValueSelected(valueDefault);
  }, [valueDefault]);
  const handleOnAddLeagues = useCallback(() => {
    if (valueSelected) {
      if (valueSelected?.length > 0) {
        onAddLeague(valueSelected);
        setError(false);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [onAddLeague, valueSelected]);
  return (
    <Stack py={4}>
      <Select
        isRequired
        errorBorderColor="red"
        isInvalid={error}
        value={valueDefault}
        onChange={(e) => setValueSelected(e.target.value)}
        placeholder="Seleccionar Competicion">
        {competitions?.data.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </Select>
      <Stack direction="row" justify="end">
        <Button onClick={handleOnAddLeagues} variant="outline">
          Agregar
        </Button>
      </Stack>
    </Stack>
  );
};

export default SelectCompetitions;
