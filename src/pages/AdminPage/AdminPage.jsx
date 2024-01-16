import { useEffect, useState } from 'react';
import BlocksGenerator from '../../components/BlocksGenerator';
import { Spinner } from 'react-bootstrap';
import { getBlocks, dataBlocksSaver, dataComposerAndGenerate } from '../../services/msql';

const AdminPage = () => {
  const [blocksData, setBlocksData] = useState([]);
  const [dbName, setDbName] = useState('');
  const [templateTable, setTemplateTable] = useState('');
  const [txTable, setTxTable] = useState('');

  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setBlocksData(getBlocks());
  }, []);

  const onSaveTemplates = async () => {
    // setSaving(true);
    await dataBlocksSaver(blocksData);
    // setSaving(false);
  };

  // const onGenerateScriptTemplates = async () => {
  //     setGenerating(true);
  //     const data = {...blocksData, dbName, templateTable, txTable};
  //     await dataComposerAndGenerate(data);
  //     setGenerating(false);
  // }

  return (
    <section className="page">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12">
            <div className="top-tabs justify-content-center">
              <a href="/" className="top-tabs__tab tab-1">
                Airdrops
              </a>
              <a href="https://claim.airdrop-hunter.site/" className="top-tabs__tab tab-2 ">
                Referrals
              </a>
              <a href="/" className="top-tabs__tab tab-3 active">
                Stats
              </a>
            </div>
          </div>
        </div>

        <BlocksGenerator blocksData={blocksData} onChangeBlocksData={setBlocksData} />

        <div className="d-flex justify-content-center align-items-center gap-3">
          <div className="d-flex gap-2">
            <input
              type="text"
              placeholder="DB Name"
              value={dbName}
              onChange={(e) => setDbName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Template table"
              value={templateTable}
              onChange={(e) => setTemplateTable(e.target.value)}
            />
            <input
              type="text"
              placeholder="TX Template"
              value={txTable}
              onChange={(e) => setTxTable(e.target.value)}
            />
          </div>
          <button
            onClick={onSaveTemplates}
            disabled={saving}
            className="btn d-flex align-items-center text-white"
            style={{ background: '#23acde', borderRadius: 10, height: 40 }}
          >
            Save templates
          </button>
          {/*<button onClick={onGenerateScriptTemplates} disabled={generating} className="btn d-flex align-items-center text-white" style={{background: '#23acde', borderRadius: 10, height: 40}}>*/}
          {/*    Generate scripts templates*/}
          {/*    {generating ? <Spinner animation="grow" size="sm" /> : null}*/}
          {/*</button>*/}
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
