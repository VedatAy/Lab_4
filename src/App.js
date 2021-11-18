import {useState} from 'react';
import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#000000',
    padding: '50px',
  },
  header: {
    textAlign:'center',
    color : '#000000',
    height: '60px',
    backgroundColor: '#496899',
    flexShrink: 0,
  },
  footer: {
    textAlign:'center',
    color : '#000000',
    height: '60px',
    backgroundColor: '#496899',
    flexShrink: 0,
  },
  main: {
    backgroundColor: '#000000',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  channels: {
    textAlign:'center',
    minWidth: '150px',
    color:'#496899',
  },
  channel: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    color:'#496899',
  },
  messages: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  message: {
    margin: '.2rem',
    padding: '.2rem',
    // backgroundColor: '#66728E',
    ':hover': {
      backgroundColor: '#e0c3ba',
    },
  },
  form: {
    borderTop: '2px solid #000000',
    padding: '.5rem',
    display: 'flex',
  },
  content: {
    flex: '1 1 auto',
    marginRight: '.5rem',
  },
  send: {
    backgroundColor: '#496899',
    padding: '.2rem .5rem',
    border: 'none',
    ':hover': {
      backgroundColor: '#496899',
      cursor: 'pointer',
      color: '#496899',
    },
  },
  
}

const MessageForm = ({
  addMessage
}) => {
  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    addMessage({
      content: data.get('content'),
      author: 'Vedat',
      creation: Date.now(),
    })
    e.target.elements.content.value = ''
  } 
  return (
    <form css={styles.form}  onSubmit={onSubmit}>
      <input type="input" name="content" css={styles.content} />
      <input type="submit" value="Send" css={styles.send} />
    </form>
  )
}

export default ({
  channel = {
    name: ': Channel 1'
  }
}) => {
  const [messages, setMessages] = useState([{
    author: 'Sergei',
    creation: 1602831101929,
    content: `
    I created this channel to know if we are ready guys
    `,
  },{
    author: 'David',
    creation: 1602832138892,
    content: `
    I can't come with you guys ..
    `,
  },{
    author: 'Matthias',
    creation: 1602840139202,
    content: `
    Are we ready to go to the party ?
    `,
  },{
    author: 'Raphael',
    creation: 1602844139200,
    content: `
    Hello Guys !
    `,
  }])
  const addMessage = (message) => {
    setMessages([
      ...messages,
      message
    ])
  }
  return (
    <div className="App" css={styles.root}>
      <header className="App-header" css={styles.header}>
        <h4>Chat Application !</h4>
      </header>
      <main className="App-main" css={styles.main}>
        <div css={styles.channels}>
          <h4>Channels list</h4>
        </div>
        <div css={styles.channel}>
          <div css={styles.messages}>
            <h1>Messages for {channel.name}</h1>
            <ul>
              { messages.map( (message, i) => (
                <li key={i} css={styles.message}>
                  <p>
                    <span>{message.author}</span>
                    {' '}
                    <span>{(new Date(message.creation)).toString()}</span>
                  </p>
                  <div>
                    {
                      message.content
                      .split(/(\n +\n)/)
                      .filter( el => el.trim() )
                      .map( el => <p>{el}</p>)
                    }
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <MessageForm addMessage={addMessage} />
        </div>
      </main>
      <footer className="App-footer" style={styles.footer}>
        <header>
          <h4>Copyright ©</h4>
        </header>
      </footer>
    </div>
  );
}
