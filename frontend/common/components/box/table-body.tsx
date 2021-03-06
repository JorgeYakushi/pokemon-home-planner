import { FC } from "react";
import Image from "next/image";
import styles from "@/styles/table.module.scss";
import { IBoxItem } from "@/interfaces/box-items.interface";
import { IPokemonDetail } from "@/interfaces/pokemon-detail.interface";
import { useEffect, useState } from "react";
interface ITableProps {
  boxItems: IBoxItem[];
  detailMap: Map<string, IPokemonDetail>;
  setDetailMap(map: Map<string, IPokemonDetail>): any;
  setPokemonGuid(pokemonGuid: string): any;
}
export const TableBody: FC<ITableProps> = ({
  boxItems,
  detailMap,
  setDetailMap,
  setPokemonGuid,
}) => {
  const [boxIndex, setBoxIndex] = useState<number>(0);

  useEffect(() => {
    if (boxItems) {
      setPokemonGuid(boxItems[boxIndex].pokemonGuid);
    }
  }, [boxIndex, boxItems, setPokemonGuid]);
  const handleClick = (e: any, index: number) => {
    switch (e.detail) {
      case 1:
        setBoxIndex(index);
        break;
      case 2:
        let pokemonGuid = boxItems[index].pokemonGuid;
        if (detailMap.get(pokemonGuid)) {
          let tempMap = new Map(detailMap);
          let tempPokemon: IPokemonDetail = tempMap.get(pokemonGuid)!;
          tempPokemon.isCaught = !tempPokemon.isCaught;
          tempMap.set(pokemonGuid, tempPokemon);
          setDetailMap(tempMap);
        }
        break;
      default:
        return;
    }
  };
  return (
    <>
      <div className={styles.table__body}>
        {boxItems?.map((pokemon, index) => (
          <div
            className={styles.box}
            key={index}
            onClick={(e) => {
              handleClick(e, index);
            }}
          >
            <div
              className={[
                styles.item,
                pokemon.boxPosition === boxIndex + 1
                  ? styles["item--selected"]
                  : "",
                pokemon.pokemonGuid ? styles["item--not-empty"] : null,
              ].join(" ")}
            >
              {detailMap.get(pokemon.pokemonGuid) ? (
                <div>
                  <Image
                    src={`/sprites/${
                      detailMap.get(pokemon.pokemonGuid)?.sprite
                    }`}
                    alt="no pokemon"
                    height={50}
                    width={50}
                    className={
                      !detailMap.get(pokemon.pokemonGuid)?.isCaught
                        ? styles["not-caught"]
                        : ""
                    }
                  />
                </div>
              ) : (
                <div style={{ height: "55px", width: "55px" }}></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
