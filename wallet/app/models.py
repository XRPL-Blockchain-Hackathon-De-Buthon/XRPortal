# wallet/models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'Users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(255), nullable=False)
    user_email = db.Column(db.String(255), nullable=False)
    user_pw = db.Column(db.String(255), nullable=False)
    user_wallet_address = db.Column(db.String(255))
    user_token_balance = db.Column(db.Numeric(20, 4))
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    # 관계(One-to-many) 예시:
    posts = db.relationship('Posts', backref='writer', foreign_keys='Posts.writer_id')
    owned_posts = db.relationship('Posts', backref='owner', foreign_keys='Posts.owner_id')
    ads = db.relationship('Ads', backref='user', foreign_keys='Ads.user_id')
    comments = db.relationship('Comments', backref='user', foreign_keys='Comments.user_id')
    # ... 필요에 따라 추가

    def __repr__(self):
        return f"<Users {self.id} {self.user_name}>"


class Posts(db.Model):
    __tablename__ = 'Posts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    post_title = db.Column(db.String(255), nullable=False)
    post_content = db.Column(db.Text, nullable=False)
    writer_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    price = db.Column(db.Numeric(20,4))
    gas_fee = db.Column(db.Numeric(20,4))
    view_count = db.Column(db.Integer, default=0)
    sale_status = db.Column(db.Boolean, default=False)  # TINYINT(1)을 bool로 매핑
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    # Comments 등 관계
    comments = db.relationship('Comments', backref='post', foreign_keys='Comments.post_id')
    post_likes = db.relationship('PostLikes', backref='post', foreign_keys='PostLikes.post_id')
    # ... 필요에 따라 추가

    def __repr__(self):
        return f"<Posts {self.id} {self.post_title}>"


class Ads(db.Model):
    __tablename__ = 'Ads'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ad_title = db.Column(db.String(255), nullable=False)
    ad_content = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    ad_price = db.Column(db.Numeric(20,4), nullable=False)
    click_count = db.Column(db.Integer, default=0)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    # 광고 클릭 관계
    ad_clicks = db.relationship('AdClicks', backref='ad', foreign_keys='AdClicks.ad_id')

    def __repr__(self):
        return f"<Ads {self.id} {self.ad_title}>"


class Comments(db.Model):
    __tablename__ = 'Comments'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    post_id = db.Column(db.Integer, db.ForeignKey('Posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    comment_content = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    # 댓글 좋아요
    comment_likes = db.relationship('CommentLikes', backref='comment', foreign_keys='CommentLikes.comment_id')

    def __repr__(self):
        return f"<Comments {self.id} post={self.post_id} user={self.user_id}>"


class Transactions(db.Model):
    __tablename__ = 'Transactions'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    seller_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    buyer_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('Posts.id'), nullable=False)
    amount = db.Column(db.Numeric(20,4), nullable=False)
    gas_fee = db.Column(db.Numeric(20,4), default=0.001)
    transaction_type = db.Column(db.String(255), nullable=False)  # 예: 'sale', 'reward', ...
    transaction_hash = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(255), default='completed')
    transaction_date = db.Column(db.DateTime)

    # 관계: 판매자, 구매자, 게시글
    seller = db.relationship('Users', foreign_keys=[seller_id], backref='sales')
    buyer = db.relationship('Users', foreign_keys=[buyer_id], backref='purchases')
    post = db.relationship('Posts', foreign_keys=[post_id], backref='transactions')

    def __repr__(self):
        return f"<Transactions {self.id} type={self.transaction_type}>"


class AdClicks(db.Model):
    __tablename__ = 'AdClicks'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ad_id = db.Column(db.Integer, db.ForeignKey('Ads.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('Posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"<AdClicks {self.id} ad={self.ad_id} post={self.post_id} user={self.user_id}>"


class PostLikes(db.Model):
    __tablename__ = 'PostLikes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    post_id = db.Column(db.Integer, db.ForeignKey('Posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"<PostLikes {self.id} post={self.post_id} user={self.user_id}>"


class CommentLikes(db.Model):
    __tablename__ = 'CommentLikes'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    comment_id = db.Column(db.Integer, db.ForeignKey('Comments.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    def __repr__(self):
        return f"<CommentLikes {self.id} comment={self.comment_id} user={self.user_id}>"
