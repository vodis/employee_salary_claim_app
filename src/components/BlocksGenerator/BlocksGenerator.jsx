import Table from '../../components/Table';
import { Button } from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import { useColumns } from '../../pages/AdminPage/lib';
import blockTemplates from './blockTemplates';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

const BlocksGenerator = (props) => {
  const { blocksData, onChangeBlocksData } = props;
  const [onCreateTableCellRefFromTo, setOnCreateTableCellRefFromTo] = useState(null); // ['', ''] OR null

  useEffect(() => {
    if (
      onCreateTableCellRefFromTo &&
      onCreateTableCellRefFromTo[0] &&
      onCreateTableCellRefFromTo[1]
    ) {
      const cpBlocksData = cloneDeep(blocksData);
      const [key1, key2, key3] = onCreateTableCellRefFromTo[0].split(':');
      const findBlockByBlockId = blocksData.blocks.findIndex((bl) => bl.id === key1);
      cpBlocksData.blocks[findBlockByBlockId].transactions[key2][key3] =
        onCreateTableCellRefFromTo[1];
      onChangeBlocksData(cpBlocksData);
      setOnCreateTableCellRefFromTo(null);
    }
  }, [onCreateTableCellRefFromTo, blocksData, onChangeBlocksData]);

  const handleChangeBlockData = (newBlockData, blockId) => {
    // Should update 1 block
    const cpBlocksData = cloneDeep(blocksData);
    cpBlocksData.blocks[blockId].transactions = newBlockData;
    // Should update all blocks
    onChangeBlocksData(cpBlocksData);
  };

  const handeAddNewTemplate = (type) => {
    const cpBlocksData = cloneDeep(blocksData);
    if (!cpBlocksData?.blocks) {
      blockTemplates[type].id = uuidv4();
      cpBlocksData.blocks = [blockTemplates[type]];
    } else {
      blockTemplates[type].id = uuidv4();
      cpBlocksData.blocks = [...cpBlocksData.blocks, blockTemplates[type]];
    }
    // Should update all blocks
    onChangeBlocksData({ ...blocksData, ...cpBlocksData });
  };

  const handleDeleteTemplateById = (id) => {
    const cpBlocksData = cloneDeep(blocksData);
    const aheadEls = cpBlocksData.blocks.slice(0, id);
    const behindEls = cpBlocksData.blocks.slice(id + 1);
    cpBlocksData.blocks = aheadEls.concat(behindEls);
    onChangeBlocksData(cpBlocksData);
  };

  const handleMoveBlockUp = (id) => {
    if (id === 0) {
      return;
    }
    const cpBlocksData = cloneDeep(blocksData);
    const elToMove = cloneDeep(cpBlocksData.blocks[id]);
    const elInChange = cloneDeep(cpBlocksData.blocks[id - 1]);
    cpBlocksData.blocks[id - 1] = elToMove;
    cpBlocksData.blocks[id] = elInChange;
    onChangeBlocksData(cpBlocksData);
  };

  const handleMoveBlockDown = (id) => {
    const cpBlocksData = cloneDeep(blocksData);
    if (id === cpBlocksData.blocks.length - 1) {
      return;
    }
    const elToMove = cloneDeep(cpBlocksData.blocks[id]);
    const elInChange = cloneDeep(cpBlocksData.blocks[id + 1]);
    cpBlocksData.blocks[id + 1] = elToMove;
    cpBlocksData.blocks[id] = elInChange;
    onChangeBlocksData(cpBlocksData);
  };

  return (
    <div className="wrapper m-5">
      <div className="d-flex justify-content-end mb-3 align-items-center gap-2">
        {`Added blocks (${blocksData.blocks?.length || 0})`}
        <div className="dropdown">
          <Button
            variant="dark"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Add block <i className="bi bi-database-fill-add"></i>
          </Button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {Object.keys(blockTemplates).map((template, i) => (
              <button
                key={i + template}
                className="btn dropdown-item"
                onClick={() => handeAddNewTemplate(template)}
                disabled={blockTemplates[template].status !== 'open'}
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="total row items-wrap grid-wrap justify-content-center"
        style={{ overflowX: 'clip' }}
      >
        <div className="col-24 col-md-12 blk blk_airdrop">
          {blocksData.blocks?.map((block, blockIndex) => (
            <div className="box-wrapper" key={block.name + block.id}>
              <div className="box-item">
                <div className="box-top">
                  <div className="box-title d-flex justify-content-between">
                    <div className="d-flex gap-3 flex-grow-1">
                      <span onClick={() => handleMoveBlockUp(blockIndex)}>
                        <i className="bi bi-arrow-bar-up"></i>
                      </span>
                      <span onClick={() => handleMoveBlockDown(blockIndex)}>
                        <i className="bi bi-arrow-bar-down"></i>
                      </span>
                      {`Block №${blockIndex + 1}`}
                    </div>
                    <span className="flex-grow-1">{block.name}</span>
                    <span
                      className="pointer-event flex-grow-1"
                      onClick={() => handleDeleteTemplateById(blockIndex)}
                      style={{ textAlign: 'right' }}
                    >
                      <i className="bi bi-trash"></i>
                    </span>
                  </div>
                </div>
                <div className="box-bottom">
                  <div className="box-line overflow-auto">
                    <Table
                      id={block.id}
                      index={blockIndex}
                      tableColumns={useColumns()} // eslint-disable-line react-hooks/rules-of-hooks
                      tableData={block.transactions}
                      blocksData={blocksData}
                      onChange={handleChangeBlockData}
                      injectTableRowsLogic={(row) => row.status === 'close'}
                      tableCellRef={onCreateTableCellRefFromTo}
                      setTableCellRef={setOnCreateTableCellRefFromTo}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlocksGenerator;
